import antenatalSupport from "../assets/antenatal-support.png"
import postpartumSupport from "../assets/postpartum-support.png"
import specializedSupport from "../assets/specialized-support.png"

const galleryItems = [
  {
    title: "Mother-Centered Care",
    image: "/mother-feeding.png",
  },
  {
    title: "Antenatal Guidance",
    image: antenatalSupport,
  },
  {
    title: "Postpartum Support",
    image: postpartumSupport,
  },
  {
    title: "Specialized Care",
    image: specializedSupport,
  },
]

function Gallery() {
  return (
    <section id="gallery" className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="section-frame">
        <div className="text-center">
          <h2 className="heading-h2">Gallery</h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-7 text-[#1E2A52]/80">
            A closer look at the care, support, and guidance families can expect from BreastBuddies.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-[#DDE8F7] bg-white shadow-[0_14px_32px_rgba(30,42,82,0.08)]"
            >
              <div className="aspect-[4/3] bg-[#F8FBFF]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-5 py-4">
                <h3 className="font-playfair text-xl font-bold text-[#0353A4]">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
