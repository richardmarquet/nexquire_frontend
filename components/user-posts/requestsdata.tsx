import { Tag, FormFields, Post } from "./PostData";

export const Requests: Post[] = [
  {
    id: "1",
    client: "Home Depot",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/1200px-TheHomeDepot.svg.png",
    priority: "High",
    timeCreated: "1 day ago...",
    title: "Mulch and Wood",
    posts: [
      {
        id: "1",
        title: "Mulch Needed",
        dateNeeded: new Date("10/11/2024"),
        prioritydata: 85,
        description:
          "Seeking 30 tons of premium organic mulch for a large gardening site. The mulch should be sourced sustainably, free from harmful chemicals. It should contribute to soil health, water retention, and plant growth. We prefer a natural aesthetic that complements the landscape. Delivery scheduled for morning hours. Attention to detail and quality standards appreciated. Provide information on available mulch types and recommendations based on gardening goals. Thank you for considering our request!",
        tags: [{ id: 1, primary: "Mulch Type A", secondary: "Organic Mulch" }],
      },
      {
        id: "2",
        title: "Wood Needed",
        dateNeeded: new Date("10/10/2035"),
        prioritydata: 60,
        description:
          "Seeking a substantial supply of high-quality ash and maple wood for a large-scale woodworking project. The requirement is for 200,000 pieces of wood that meet specific dimensions and quality standards. The wood should be well-seasoned, free from defects, and suitable for crafting furniture with a fine finish. We value sustainability and prefer wood sourced from responsibly managed forests. Please provide details on available sizes, grades, and pricing. Timely delivery is crucial for our project timeline. Thank you!",
        tags: [{ id: 1, primary: "tagData1" }],
      },
      {
        id: "3",
        title: "Wood Needed",
        dateNeeded: new Date("08/13/2044"),
        prioritydata: 65,
        description:
          "In need of a reliable supply of 100,000 pieces of high-quality pine wood for a construction project. The wood should be suitable for structural applications and meet industry standards for strength and durability. We prioritize sustainable sourcing and request information on the wood's origin and environmental certifications. Timely delivery is crucial, and we appreciate detailed quotes including pricing and delivery terms. Thank you for your consideration!",
        tags: [{ id: 1, primary: "tagData1" }],
      },
      {
        id: "4",
        title: "Wood Needed",
        dateNeeded: new Date("08/13/2044"),
        prioritydata: 75,
        description:
          "Looking to procure 100,000 pieces of premium pine wood for a woodworking endeavor. The wood should be of top-notch quality, free from knots and imperfections. We are specifically interested in wood with a smooth finish, suitable for crafting high-end furniture pieces. Sustainability is a key consideration, and we prefer suppliers with eco-friendly practices. Please provide detailed information on available grades, dimensions, and pricing. Timely delivery is essential for our project timeline. Thank you!",
        tags: [{ id: 1, primary: "tagData1" }],
      },
    ],
  },
  {
    id: "2",
    client: "Wood&Co",
    imgSrc:
      "https://image.freepik.com/free-vector/wood-company-logo-design-inspiration_139869-56.jpg",
    priority: "Medium",
    timeCreated: "3 days ago...",
    title: "Stone and Wood",
    posts: [
      {
        id: "1",
        title: "Stone Needed",
        dateNeeded: new Date("12/22/2049"),
        prioritydata: 16,
        description:
          "In need of a premium supply of marble for a prestigious architectural project. We require 4 tons of carefully selected marble with specific characteristics, including color, veining, and finish. The marble should be of the highest quality, suitable for creating elegant and durable surfaces. We appreciate details on available varieties, pricing, and delivery options. Timely delivery is essential to meet our project deadlines. Thank you for your attention to quality and precision.",
        tags: [{ id: 1, primary: "TagData1" }],
      },
      {
        id: "2",
        title: "Wood Needed",
        dateNeeded: new Date("10/10/2035"),
        prioritydata: 45,
        description:
          "Seeking a substantial supply of wood for a large-scale woodworking project. The requirement is for 200,000 pieces of ash, maple, and mahogany wood. We prioritize high-quality wood that meets specific dimensions and quality standards. The ash wood should be sturdy, the maple should have a fine finish, and the mahogany should exhibit rich color. Sustainability is crucial, and we prefer responsibly sourced wood. Please provide details on available sizes, grades, and pricing. Timely delivery is essential for our project timeline. Thank you!",
        tags: [{ id: 1, primary: "tagData13", secondary: "seconddary1" }],
      },
    ],
  },
  {
    id: "3",
    client: "Mulch Club",
    imgSrc:
      "https://startupnews.com.au/wp-content/uploads/2016/01/Mulch-Club-Logo.png",
    priority: "Low",
    timeCreated: "2 weeks ago",
    title: "Construction Materials",
    posts: [
      {
        id: "1",
        title: "Concrete Mix",
        dateNeeded: new Date("09/09/2024"),
        prioritydata: 10,
        description:
          "In need of a reliable supplier for high-quality concrete mix for a construction project. We require a mix suitable for foundation work with specific compressive strength and curing properties. Sustainable and eco-friendly options are preferred. Please provide details on available mix designs, pricing, and delivery options. Timely delivery is crucial for our project timeline. Thank you!",
        tags: [{ id: 1, primary: "Concrete Supply" }],
      },
      {
        id: "2",
        title: "Bricks",
        dateNeeded: new Date("04/12/2037"),
        prioritydata: 15,
        description:
          "Seeking a supplier for durable bricks for a landscaping project. We require a substantial quantity of clay bricks with uniform size and color. The bricks should be suitable for outdoor use and have a classic appearance. Sustainable sourcing is important to us. Please provide details on available types, sizes, and pricing. Timely delivery is essential for our project timeline. Thank you!",
        tags: [
          { id: 1, primary: "Brick Supply", secondary: "Landscaping Project" },
        ],
      },
    ],
  },
  {
    id: "4",
    client: "Lowes",
    imgSrc:
      "http://logos-download.com/wp-content/uploads/2016/02/Lowes_logo_5824x2688_transparent.png",
    priority: "Low",
    timeCreated: "3 weeks ago",
    title: "Electrical Components",
    posts: [
      {
        id: "1",
        title: "Wiring and Cables",
        dateNeeded: new Date("12/01/2035"),
        prioritydata: 11,
        description:
          "Looking for a reliable supplier of electrical wiring and cables for a large-scale construction project. We require a variety of wires and cables with different specifications for power distribution and communication. All components should meet safety and quality standards. Sustainable and energy-efficient options are preferred. Please provide details on available types, sizes, and pricing. Timely delivery is crucial for our project timeline. Thank you!",
        tags: [{ id: 1, primary: "Electrical Components" }],
      },
      {
        id: "2",
        title: "Switches and Outlets",
        dateNeeded: new Date("02/15/2036"),
        prioritydata: 15,
        description:
          "Seeking a supplier for high-quality electrical switches and outlets for a residential construction project. We require a mix of standard and smart switches with modern designs. All components should meet safety and performance standards. Sustainable and energy-efficient options are preferred. Please provide details on available types, styles, and pricing. Timely delivery is essential for our project timeline. Thank you!",
        tags: [
          {
            id: 1,
            primary: "Switches and Outlets",
            secondary: "Residential Project",
          },
        ],
      },
    ],
  },
];
