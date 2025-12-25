import HeaderPage from "@/components/dashboard/page/HeaderPage"

export default function Home() {

  return (
    <div className="h-screen flex justify-center items-center">
      {/* HEADER  */}
        <HeaderPage 
          items={["Dashboard"]}/>
    </div>
  )
}
