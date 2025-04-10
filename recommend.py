import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df_interactions = pd.read_csv('data/interactions.csv')
df_products = pd.read_csv('data/products.csv')

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

def get_recommendations(target_product_id, n=5):
    similarities = cosine_sim_matrix[id_to_index_map[target_product_id]]
    # print(similarities)
    id_sim = list(zip(df_products['product_id'], similarities))
    sorted_id_sim = sorted(id_sim, key=lambda x: x[1], reverse=True)[1:n+1]
    print(sorted_id_sim)
    return [x[0] for x in sorted_id_sim]

def get_product(target_product_id):
    df = df_products[df_products['product_id'] == target_product_id]
    df['final_price'] = df['price'] * (100 - df['discount']) / 100
    return df

def get_similar_products(target_product_id):
    similar = get_recommendations(target_product_id)
    df_similar = df_products[df_products['product_id'].isin(similar)]
    df_similar['final_price'] = df_similar['price'] * (100 - df_similar['discount']) / 100
    return df_similar