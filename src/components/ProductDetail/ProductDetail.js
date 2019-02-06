import React, { Component } from 'react'
import axios from 'axios'
import "./ProductDetail.css"
import Review from '../Review/Review'
import {Redirect} from 'react-router-dom'

class ProductDetail extends Component {
  constructor() {
    super()
    this.state = {
      product: {},
      isDeleted: false
    }
    this.getData = this.getData.bind(this)
  }

  async getData() {
    const url = `/products/${this.props.id}`
    try {
      const res = await axios.get(url)
      const product = res.data
      this.setState({
        product
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {

    const onProductDelete = (product) => {
      axios.delete(`/products/${product.id}`)
        .then(res=>console.log(res.data, "Product deleted"))
        .then(this.setState({isDeleted:true}))
    }

    const reviews = this.state.product.reviews

    const productReviews = reviews && reviews.length > 0 ?reviews.map(review => {
      return <Review key={review.id} review={review}/>
    }): <div></div>

    if (this.state.isDeleted === true) {
      return <Redirect to={'/products/'} />;
    }

    return(
      <div className="ProductDetail__container">
        <button className="ProductDetail__deleteButton" onClick={()=> onProductDelete(this.state.product)}>Delete</button>
        <div className="ProductDetail__details-container">
          <div className="ProductDetail__image-wrapper">
            <img className="ProductDetail__image" src={this.state.product.image_url} alt={this.state.product.name}/>
          </div>
          <div className="ProductDetail__info-container">
            <h2>{this.state.product.name}</h2>
            <h2>${this.state.product.price}</h2>
            <p>{this.state.product.description}</p>
          </div>
        </div>
        <div className="ProductDetail__review-container">
          {productReviews}
        </div>
      </div>
    )
  }
}

export default ProductDetail
