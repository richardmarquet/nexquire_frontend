interface Profile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  email: string;
  profile_pic_file_path: string;
  company_id: number;
  activated: boolean;
}

export const GetAllUsers = (): Profile[] => {
  const profiles: Profile[] = [
    {
      id: "1",
      username: "johndoe1",
      first_name: "John",
      last_name: "Doe",
      middle_name: "A",
      phone: "555-1234",
      email: "johndoe1@example.com",
      profile_pic_file_path: "/images/johndoe1.jpg",
      company_id: 101,
      activated: true,
    },
    {
      id: "2",
      username: "janedoe2",
      first_name: "Jane",
      last_name: "Doe",
      middle_name: "B",
      phone: "555-2345",
      email: "janedoe2@example.com",
      profile_pic_file_path: "/images/janedoe2.jpg",
      company_id: 102,
      activated: true,
    },
    {
      id: "3",
      username: "samsmith3",
      first_name: "Sam",
      last_name: "Smith",
      middle_name: "C",
      phone: "555-3456",
      email: "samsmith3@example.com",
      profile_pic_file_path: "/images/samsmith3.jpg",
      company_id: 103,
      activated: false,
    },
    {
      id: "4",
      username: "maryjones4",
      first_name: "Mary",
      last_name: "Jones",
      middle_name: "D",
      phone: "555-4567",
      email: "maryjones4@example.com",
      profile_pic_file_path: "/images/maryjones4.jpg",
      company_id: 104,
      activated: true,
    },
    {
      id: "5",
      username: "peterbrown5",
      first_name: "Peter",
      last_name: "Brown",
      middle_name: "E",
      phone: "555-5678",
      email: "peterbrown5@example.com",
      profile_pic_file_path: "/images/peterbrown5.jpg",
      company_id: 105,
      activated: false,
    },
    {
      id: "6",
      username: "lisawhite6",
      first_name: "Lisa",
      last_name: "White",
      middle_name: "F",
      phone: "555-6789",
      email: "lisawhite6@example.com",
      profile_pic_file_path: "/images/lisawhite6.jpg",
      company_id: 106,
      activated: true,
    },
    {
      id: "7",
      username: "mikewilson7",
      first_name: "Mike",
      last_name: "Wilson",
      middle_name: "G",
      phone: "555-7890",
      email: "mikewilson7@example.com",
      profile_pic_file_path: "/images/mikewilson7.jpg",
      company_id: 107,
      activated: true,
    },
    {
      id: "8",
      username: "susankim8",
      first_name: "Susan",
      last_name: "Kim",
      middle_name: "H",
      phone: "555-8901",
      email: "susankim8@example.com",
      profile_pic_file_path: "/images/susankim8.jpg",
      company_id: 108,
      activated: false,
    },
    {
      id: "9",
      username: "johnlee9",
      first_name: "John",
      last_name: "Lee",
      middle_name: "I",
      phone: "555-9012",
      email: "johnlee9@example.com",
      profile_pic_file_path: "/images/johnlee9.jpg",
      company_id: 109,
      activated: true,
    },
    {
      id: "10",
      username: "emilydavis10",
      first_name: "Emily",
      last_name: "Davis",
      middle_name: "J",
      phone: "555-0123",
      email: "emilydavis10@example.com",
      profile_pic_file_path: "/images/emilydavis10.jpg",
      company_id: 110,
      activated: false,
    },
    {
      id: "11",
      username: "johndoe123",
      first_name: "John",
      last_name: "Doe",
      middle_name: "F",
      phone: "523-0134",
      email: "johndoe123@example.com",
      profile_pic_file_path: "/images/johndoe12.jpg",
      company_id: 110,
      activated: false,
    },
  ];

  return profiles;
};

export { type Profile };
