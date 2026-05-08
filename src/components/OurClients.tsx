import Buyers from "/images/Buyers.jpeg";
import Client1 from "/images/Client1.jpg";
import Client2 from "/images/Client2.jpeg";
import Client3 from "/images/Client3.jpeg";
import Client4 from "/images/Client4.jpeg";
import Client5 from "/images/Client5.jpeg";
import Client6 from "/images/Client6.jpg";
import Client7 from "/images/Client7.jpeg";
import Client8 from "/images/Client8.jpeg";
import Client9 from "/images/Client9.jpeg";
import Client10 from "/images/Client10.jpeg";
import Client11 from "/images/Client11.jpeg";
import Client12 from "/images/Client12.jpeg";
import Client13 from "/images/Client13.jpeg";
import Client14 from "/images/Client14.png";
import Client15 from "/images/Client15.jpg";

const clients = [
  Client1,
  Client2,
  Client3,
  Client4,
  Client5,
  Client6,
  Client7,
  Client8,
  Client9,
  Client10,
  Client11,
  Client12,
  Client13,
  Client14,
  Client15
];

const OurClients = () => {
  return (
    <>
      <section className="px-3 flex flex-col gap-2">
        <div className="flex flex-col items-center gap-20">
          <div>
            <h2 className="text-[26px] sm:text-3xl 2xl:text-[40px] mb-10 font-bold font-serif text-center text-gray-800">
              Our Clients
            </h2>

            <p className="font-normal text-justify md:text-center">
              We are proud to announce that we work with established brands and
              fashion startups globally.We believe that meaningful collaboration
              is built on trust and mutual respect. Our objective has always
              been to leverage our industry knowledge and expertise to create
              value for our clients!
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-10">
              {clients.map((client, index) => (
                <img
                  key={`first-${index}`}
                  src={client}
                  alt={`Client ${index + 1}`}
                  className="w-24 sm:w-28 md:w-32 lg:w-36 h-full rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>
          </div>

          <div className="md:w-[90%] w-full">
            <img
              src={Buyers}
              alt="Buyers"
              className=" w-full h-[20vh] sm:h-[25vh]"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default OurClients;
