import axios from 'axios'


export const postDataAPI = async (url) => {
    const res = await axios.post(`/api/shortenUrl`,
        {
            long_url: url
        }
    )
    return res
}
