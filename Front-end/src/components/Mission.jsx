import React from 'react'

const Mission = () => {
  return (
    <div className='mb-[40px]'>
        <div className='mb-[40px] uppercase font-bold text-3xl underline cursor-pointer text-center'>- our mission & goals -</div>
        <div className='container mx-auto justify-center grid md:grid-cols-2 gap-8'>
            <div className='m-[20px]'>
                <h1 className='font-bold mb-[20px] underline '>Our  Goals :</h1>
                <p>Our goal as a charity platform is to create a culture of giving and to democratize philanthropy. We believe that everyone should have the opportunity to make a positive impact and support causes they believe in, regardless of their financial means. Therefore, we aim to make giving accessible and easy for everyone. Our platform also aims to provide increased transparency and accountability in the charitable sector. We want to ensure that donors can trust that their contributions are being used effectively and efficiently to create meaningful change. Ultimately, our goal is to inspire and support a global community of generosity and compassion.</p>
            </div>
            <div  className='m-[20px]'>
                <h1 className='font-bold mb-[20px] underline'>our Mission :</h1>
                <p>Our mission as a charity platform is to connect donors with causes they care about and to make giving easy, transparent, and effective. We strive to empower and amplify the impact of grassroots organizations and individuals who are working to create positive change in their communities. Our platform provides a secure and user-friendly way to donate to a wide range of causes, including education, healthcare, environmental conservation, and social justice. By leveraging technology and partnerships, we aim to create a more equitable and sustainable world for all.</p>
            </div>
        </div>
    </div>
  )
}
export default Mission
