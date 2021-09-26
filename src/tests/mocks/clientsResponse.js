const clientsResponse = {
  data: [
    {
      id: "a0ece5db-cd14-4f21-812f-966633e7be86",
      name: "Britney",
      email: "britneyblankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
      name: "Manning",
      email: "manningblankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
      name: "Barnett",
      email: "barnettblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "44e44268-dce8-4902-b662-1b34d2c10b8e",
      name: "Merrill",
      email: "merrillblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "0178914c-548b-4a4c-b918-47d6a391530c",
      name: "Whitley",
      email: "whitleyblankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "a74c83c5-e271-4ecf-a429-d47af952cfd4",
      name: "Lamb",
      email: "lambblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "55601290-8619-4f54-b831-9c6c26c52b44",
      name: "Ophelia",
      email: "opheliablankenship@quotezart.com",
      role: "user",
    },
    {
      id: "1470c601-6833-48a4-85b4-ddab9c045916",
      name: "Jerry",
      email: "jerryblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "b2cbdea3-5bc6-4e14-8d21-579aba6845b2",
      name: "Dina",
      email: "dinablankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "f80b6ab6-ef21-4bd9-9d87-bec464e0f60f",
      name: "Thelma",
      email: "thelmablankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "a8988671-19a7-478d-b6c7-f345554b8776",
      name: "Pamela",
      email: "pamelablankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "12f34e63-d4f1-4701-bbad-5b4b81a66a38",
      name: "Simone",
      email: "simoneblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "2dbaac64-c13b-4d02-a980-e03627dee50d",
      name: "Bethany",
      email: "bethanyblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "162db393-55ef-4b2c-988d-17ba7c606785",
      name: "Harris",
      email: "harrisblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "f382dce9-8152-49ba-ba54-9a7f90a8a332",
      name: "Doreen",
      email: "doreenblankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "ca8b8993-06eb-4061-a6a4-d2db80d25e23",
      name: "Baxter",
      email: "baxterblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "8e336cb2-37d0-4e3d-91d8-0a1d2b3e5967",
      name: "Allen",
      email: "allenblankenship@quotezart.com",
      role: "admin",
    },
    {
      id: "73107cc4-8bbd-46e2-b6b4-8c720d5424d6",
      name: "Spears",
      email: "spearsblankenship@quotezart.com",
      role: "user",
    },
    {
      id: "ac2487f3-af05-40e3-98ea-360482dcf1e0",
      name: "Roberts",
      email: "robertsblankenship@quotezart.com",
      role: "admin",
    },
  ],
  headers: {
    etag: "etag",
  },
};

const clientsResponseWithPolicies = [
  {
    id: "a0ece5db-cd14-4f21-812f-966633e7be86",
    name: "Britney",
    email: "britneyblankenship@quotezart.com",
    role: "admin",
    policies: [
      {
        id: "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
        amountInsured: "399.89",
        inceptionDate: "2015-07-06T06:55:49Z",
      },
      {
        id: "6f514ec4-1726-4628-974d-20afe4da130c",
        amountInsured: "697.04",
        inceptionDate: "2014-09-12T12:10:23Z",
      },
    ],
  },
  {
    id: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
    name: "Manning",
    email: "manningblankenship@quotezart.com",
    role: "admin",
    policies: [],
  },
];

const existentUserId = "73107cc4-8bbd-46e2-b6b4-8c720d5424d6";
const anotherUserId = "ac2487f3-af05-40e3-98ea-360482dcf1e0";
const unexistentUserid = "fakeId";
const existentUserName = "Roberts";

export {
  clientsResponse,
  existentUserId,
  unexistentUserid,
  anotherUserId,
  existentUserName,
  clientsResponseWithPolicies,
};
