import React from 'react'
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.png"
import image7 from "../assets/image7.png"
import image8 from "../assets/image8.png"
import image9 from "../assets/image9.png"

const slides = [
  {
    cards: [
      {
        imageSrc: `${image5}`,
        headerText: 'Beach Cleanups',
        paragraphText: 'Clean-up Day: Organize a clean-up day in a local park or public area. Volunteers can come together to pick up trash, remove debris, and plant trees or flowers.',
      },
      {
        imageSrc: `${image6}`,
        headerText: 'Painting Day',
        paragraphText: ' Several animal welfare organizations in Morocco hold events to raise awareness about animal rights and welfare. These events include adoption drives, fundraising events, see more',
      },
      {
        imageSrc: `${image7}`,
        headerText: 'Painting Day',
        paragraphText: ' Several animal welfare organizations in Morocco hold events to raise awareness about animal rights and welfare. These events include adoption drives, fundraising events, see more',
      },
    ],
  },
  {
    cards: [
      {
        imageSrc: `${image8}`,
        headerText: 'Charity Marathons',
        paragraphText: 'Clean-up Day: Organize a clean-up day in a local park or public area. Volunteers can come together to pick up trash, remove debris, and plant trees or flowers.',
      },
      {
        imageSrc: `${image9}`,
        headerText: 'Charity Marathons',
        paragraphText: 'Painting Day: Organize a painting day in a local school or community center. Volunteers can come together to paint classrooms, hallways, or other areas of the building.',
      },
      {
        imageSrc: `${image9}`,
        headerText: 'Animal Welfare Events',
        paragraphText: 'Morocco hosts several charity marathons throughout the year, which attract both local and international participants. These events not only raise funds for various causes ,see more',
      },
    ],
  },
];



const Slides = () => {
  return (
      <>
        <div className=' lg:ms-[120px] lg:me-[120px] md:ms-[80px] md:me-[40px]  sm:ms-[80px] sm:me-[40px]'>
        <div className='uppercase font-bold text-3xl mb-[40px] cursor-pointer text-center'>A selection of currently available opportunities </div>
        <h1 className='text-2xl text-normal ms-[20px]'>Events :</h1>
        <div className=" overflow-x-scroll scrollbar-hide	 ">
          <div className="flex ">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex "
              >
                {slide.cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="flex-1 mb-[20px] mt-[20px] cursor-pointer mx-4 max-w-xs bg-white shadow-md rounded-lg  overflow-hidden"
                  >
                    <img
                      src={card.imageSrc}
                      alt=""
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h1 className="text-2xl font-bold mb-2">{card.headerText}</h1>
                      <p className="text-md">{card.paragraphText}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>                          
      </div>

      <div className=' lg:ms-[120px] lg:me-[120px] md:ms-[80px] md:me-[40px]  sm:ms-[80px] sm:me-[40px]'>
        <h1 className='text-2xl text-normal ms-[20px]'>Donations :</h1>
        <div className=" overflow-x-scroll scrollbar-hide	 ">
          <div className="flex ">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex "
              >
                {slide.cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="flex-1 mb-[20px] mt-[20px] cursor-pointer mx-4 max-w-xs bg-white shadow-md rounded-lg  overflow-hidden"
                  >
                    <img
                      src={card.imageSrc}
                      alt=""
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h1 className="text-2xl font-bold mb-2">{card.headerText}</h1>
                      <p className="text-md">{card.paragraphText}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>                          
      </div>
    </>

  )
}

export default Slides
