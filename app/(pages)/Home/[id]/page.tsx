
import { notFound } from "next/navigation";
async function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const routes = [
      "password","coupon", "note"
    ]
    if(!routes.includes(id)){
      console.log("valid route", routes.includes(id))
      return notFound();
    }
  return (
    <div>
        <b>Home Page with ID:</b><span>{id}</span>
        
    </div>
  )
}

export default Page