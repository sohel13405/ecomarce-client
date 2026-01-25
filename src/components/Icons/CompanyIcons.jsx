export default function CompanyIcons() {
    const companies = [
      {
        id: 1,
        name: "Apple",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      },
      {
        id: 2,
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      },
      {
        id: 3,
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      },
      {
        id: 4,
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      },
      {
        id: 5,
        name: "Meta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Meta_Platforms_Inc._logo.svg",
      },
      {
        id: 6,
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      },
      {
        id: 7,
        name: "Tesla",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      },
      {
        id: 8,
        name: "Samsung",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      },
      {
        id: 9,
        name: "Sony",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
      },
    ];
  
    return (
      <div className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-10 flex-wrap">
  
            {companies.map((company) => (
              <div
                key={company.id}
                className="
                  group
                  w-24 h-24
                  flex items-center justify-center
                  rounded-2xl
                  border border-transparent
                  transition-all duration-300
                  hover:border-black
                  hover:shadow-lg
                  hover:scale-110
                  cursor-pointer
                "
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="
                    max-h-12
                    grayscale
                    group-hover:grayscale-0
                    transition
                  "
                />
              </div>
            ))}
  
          </div>
        </div>
      </div>
    );
  }
  