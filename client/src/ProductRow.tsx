import React, {useState, useEffect} from 'react'
import ProductPreviewTile from './ProductPreviewTile'
import axios, {AxiosError} from 'axios'
import { AxiosServerError, AxiosServerResponse, ServerImageInformation, ProductInformation} from './dec';

export interface ProductRowProps {
    rowCategory: string;
    productCategory: string
    currentProduct: ProductInformation,
    setCurrentProduct(value: ProductInformation): void 
}

const axiosClient = axios.create({
    baseURL: '/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
});

const getServerImageInformation = async (productCategory: string):Promise<AxiosServerResponse>  => {
  try {
    const response = await axiosClient.get(`/${productCategory}`)
    return ({statusCode: `${response.status}` , responseObject: response.data})
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<AxiosServerError>
      return ({statusCode: `${axiosError.code}`, responseObject: [{title: '', sourceID:'', imageID:'', imagePath:'', price: 0}]})
    }
    throw err;
  }
};

const ProductRow: React.FC<ProductRowProps> = (props) => {
    const [imageArray, setImageArray] = useState<Array<ServerImageInformation>>([])
    useEffect(() => {
        async function loadImageData() {
            await getServerImageInformation(props.productCategory)
            .then(response => {
                setImageArray(response.responseObject)
            }).catch(err => {
                console.log(err);
            })
        }

        loadImageData();
    },[])

    return(
        <div className="productsMainRowDiv">
            <h3 className="productRowH3">{props.rowCategory}</h3>
            <div className="productsDiv">
                {
                imageArray.map((image,i) => (
                    <div key={i} className="productRow">
                        <ProductPreviewTile currentProduct={props.currentProduct} image={image} setCurrentProduct={props.setCurrentProduct} />
                <h3 className="productRowPrices">$ {image.price || 100}</h3>
                    </div>
                    ))
                }
            </div>
        </div>
    )
    
}

export default ProductRow