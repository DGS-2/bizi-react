import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>What is Bizi?</h1><hr />
        <p className="text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis libero voluptatum inventore. Placeat dolores ullam minima officia est magnam sapiente vel similique quo accusamus quidem, sed tempore iusto ad asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, molestiae rem qui commodi voluptatum, placeat magni hic consequuntur ipsum dignissimos non recusandae quasi animi expedita, in ratione nesciunt eos explicabo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit accusantium nesciunt perferendis maxime laboriosam officiis voluptatem debitis magnam libero fugiat ad non exercitationem, ratione consectetur facilis dolorem maiores necessitatibus nostrum?</p>
        <h4 className="text-center">How can Bizi help you?</h4><hr />
        <p className="text-justfy">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore ipsum, ad iusto, eum adipisci voluptates ex sunt similique, quas hic quis asperiores. Ab sit id dicta aliquam vel sed illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, libero. Enim explicabo iste veritatis amet repellat ex repudiandae, sint saepe. Eum aperiam laborum alias, soluta est natus? Incidunt, aliquid sed. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, assumenda voluptate sit ducimus laborum placeat pariatur dolorem iste recusandae asperiores quae quo nostrum provident, enim incidunt voluptas. Repellendus, veritatis omnis?</p>
        <div className="container-fluid pt-5">
          <h4 className="text-center">
            <Link to="/dashboard" className="btn btn-outline-success btn-xl">Get Started</Link>
          </h4>
        </div>
      </div>
    )
  }
}
