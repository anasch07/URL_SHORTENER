import Head from 'next/head'
import {useState} from "react";
import {postDataAPI} from "@/utils/fetchData";
import {validateUrlFormat} from "@/utils/validators";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [requestIsMade, setRequestIsMade] = useState(false)


    const getShortUrl = async (longUrl) => {

        if(!validateUrlFormat(longUrl)){
            console.log("Invalid Url Format")
            toast.error('Invalid Url Format')
            return
        }
        setShortUrl('')
        setRequestIsMade(true)
        const response =  await  postDataAPI(longUrl);
        if(response.data.message){
            toast.error(response.data.message)
            return
        }

        setShortUrl(response.data.link)
    }

  return (
    <>
        <ToastContainer />
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="Url Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="container-fluid " style={{background : 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)', height: '100vh'}}>

        <div className="container  " style={{width: '100%'}}>

            <div className="row ">
                <div className="col-12 m-4">
                    {/* white text */}
                    <h1 className="text-center display-3 text-white">URL Shortener</h1>
                </div>
            </div>

          <div className="row ">

            <div className="col-12">
                <div className="input-group mb-3">
                    <input type="text" className="form-control width: 70%" placeholder="Shorten your link" aria-label="Shorten your link" aria-describedby="button-addon2"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    />
                    <button className="btn btn-success" type="button" id="button-addon2"
                    onClick={() => getShortUrl(url)}
                    >Shorten</button>
                </div>
                </div>

            {/*  a gif to load while the url is being shortened */}
              {requestIsMade && !shortUrl && (
                    <div className="col-12 d-flex justify-content-center">
                        <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                        alt="loading"
                        style={{width: '30px', height: '30px'}}
                        />
                    </div>
                )}




              {shortUrl && (
              //     center all the content center
              <div className="col-12 d-flex justify-content-center">
                  <div className="row">
                    <a href={shortUrl} target="_blank" rel="noreferrer" className="alert alert-success" role="alert">
                        {shortUrl}
                    </a>
                      <button className="btn btn-success" type="button" id="button-addon2"
                              onClick={() => navigator.clipboard.writeText(shortUrl)}
                      >Copy</button>
                    </div>



              {/*    copy button */}




              </div>
                )}







            </div>


            </div>
        </div>



      {/*</main>*/}
    </>
  )
}
