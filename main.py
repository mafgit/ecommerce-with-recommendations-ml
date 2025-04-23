from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return jsonify({"message": "Hello, World!"})

from recommend import get_product, df_products, get_content_based_similar_products, get_collaborative_similar_products
@app.route("/get_product/<id>")
def get_product_by_id(id):
    product = get_product(id)
    
    if product.empty:
        return jsonify({"message": "Product not found"}), 404
    
    similar = get_content_based_similar_products(id)
    
    return jsonify({
        "product": product.to_dict(orient='records')[0],
        "similar": similar.to_dict(orient='records')
    })
    
@app.route("/get_recs/<user_id>")
def get_recs(user_id):
    recs = get_collaborative_similar_products(user_id)
    print(recs)
    return jsonify({'recs': recs.to_dict(orient='records')})

@app.route("/get_categories")
def get_categories():
    categories = df_products['category'].unique()
    return jsonify({'categories': categories.tolist()})


if __name__ == '__main__':
    app.run(debug=True)