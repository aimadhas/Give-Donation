import React from 'react'
import image5  from "../assets/image10.png"
import image6  from "../assets/image9.png"
import image7  from "../assets/image7.png"

const slides = [
    {
      cards: [
        {
          imageSrc: `${image5}`,
          headerText: 'Association DARELOUAD',
          paragraphText: 'a charity that works hard to achieve a better quality of life for the families and children living in the town of Dar El Qued in Morocco.',
        },
        {
          imageSrc: `${image6}`,
          headerText: 'Association les Colombes de l’Espoir',
          paragraphText: 'This organization, located in a hospital in Casablanca, encourages people to connect with children who have cancer. Any day, you can contact them and they will inform you of their events program.',
        },
        {
          imageSrc: `${image7}`,
          headerText: 'SOS Villages d’Enfants Maroc',
          paragraphText: 'SOS Children’s Villages operate in many other countries. SOS Villages d’Enfants Maroc helps children who have lost their parents connect with other families, and eventually be adopted. There are many children in Morocco in need of a family, so you can help by volunteering until they find a new home.',
        },
      ],
    }]

const Cards = () => {
  return (
    <div className=''>
        <div className='uppercase font-bold text-3xl underline cursor-pointer text-center mt-[60px] mb-[70px]'>- top rated charity -</div>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="max-w-[1240px] mx-auto justify-center grid md:grid-cols-3 gap-4 mb-[44px] "
                    >
                    {slide.cards.map((card, cardIndex) => (
                        <div
                            key={cardIndex}
                            className="flex-1 mx-4 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
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
  )
}

export default Cards
