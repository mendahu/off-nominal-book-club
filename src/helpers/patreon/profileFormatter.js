export default function profileFormatter(patreonData) {

  const { data: { attributes: { full_name, image_url } }, included } = patreonData

  const campaignBuilder = (id) = {
    //
  }

  const formattedData = {
    full_name,
    image_url,
    included
  }

  return formattedData;
}