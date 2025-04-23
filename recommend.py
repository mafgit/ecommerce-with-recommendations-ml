import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df_products = pd.read_csv('data/products.csv')

# ------- content based filtering --------
def preprocess_text(text):
    text = text.lower()
    return text

df_products['recommendation_string'] = df_products['title'] + ' ' + df_products['description']
df_products['recommendation_string'] = df_products['recommendation_string'].fillna('')
df_products['recommendation_string'] = df_products['recommendation_string'].apply(preprocess_text)

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df_products['recommendation_string'])

cosine_sim_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
# print(cosine_sim_matrix)

id_to_index_map = pd.Series(df_products.index, index=df_products['product_id'])
# print(id_to_index_map)

def get_content_based_recommendations(target_product_id, n=5):
    similarities = cosine_sim_matrix[id_to_index_map[target_product_id]]
    # print(similarities)
    id_sim = list(zip(df_products['product_id'], similarities))
    sorted_id_sim = sorted(id_sim, key=lambda x: x[1], reverse=True)[1:n+1]
    print(sorted_id_sim)
    return [x[0] for x in sorted_id_sim]

# ------- item based cf --------
interactions_df = pd.read_csv('data/interactions.csv')
filtered_df = interactions_df[interactions_df['interaction_type'] == 'review']

user_item_matrix = pd.crosstab(filtered_df['user_id'], filtered_df['product_id'], values=filtered_df['rating'], aggfunc='last')
user_item_matrix.fillna(0, inplace=True)

item_item_similarity = cosine_similarity(user_item_matrix.T)

def get_collaborative_recommendations(target_user):
    target_reviews = user_item_matrix.loc[target_user]

    # for each item reviewed by user, get similar items
    for product_idx, product_id in enumerate(target_reviews.index):
        rating = target_reviews.loc[product_id]
        # idx = user_item_matrix.columns.get_loc(product_id)
        
        if rating == 0.0:
            # if not reviewed, calculate weighted rating
            # predicted_rating(u,j) = E similarity(i,j)*rating(u,i) for every item i that u has interacted with
            #               / E similarity(i,j)
            numerator = 0
            denominator = 0
            for idx2, id2 in enumerate(target_reviews.index):
                if id2 == product_id:
                    continue 
                similarity = item_item_similarity[product_idx][idx2]
                rating = target_reviews.loc[id2]
                numerator += similarity * rating
                denominator += similarity
            print(numerator, denominator)
            if denominator == 0:
                user_item_matrix.loc[target_user, product_id] = 0.0
            else:
                user_item_matrix.loc[target_user, product_id] = numerator / denominator
            
    sorted_recs = user_item_matrix.loc[target_user].sort_values(ascending=False)
    return sorted_recs.index


# ---- flask api ----
def get_product(target_product_id):
    df = df_products[df_products['product_id'] == target_product_id]
    df['final_price'] = df['price'] * (100 - df['discount']) / 100
    return df

def get_content_based_similar_products(target_product_id):
    similar = get_content_based_recommendations(target_product_id)
    df_similar = df_products[df_products['product_id'].isin(similar)]
    df_similar['final_price'] = df_similar['price'] * (100 - df_similar['discount']) / 100
    return df_similar

def get_collaborative_similar_products(target_user_id):
    similar = get_collaborative_recommendations(target_user_id)
    df_similar = df_products[df_products['product_id'].isin(similar)]
    df_similar['final_price'] = df_similar['price'] * (100 - df_similar['discount']) / 100
    return df_similar