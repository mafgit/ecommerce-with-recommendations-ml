from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return jsonify({"message": "Hello, World!"})

from recommend import get_recommendations, get_product, get_similar_products
@app.route("/get_product/<id>")
def get_product_by_id(id):
    product = get_product(id)
    
    if product.empty:
        return jsonify({"message": "Product not found"}), 404
    
    similar = get_similar_products(id)
    
    return jsonify({
        "product": product.to_dict(orient='records')[0],
        "similar": similar.to_dict(orient='records')
    })
    

if __name__ == '__main__':
    app.run(debug=True)