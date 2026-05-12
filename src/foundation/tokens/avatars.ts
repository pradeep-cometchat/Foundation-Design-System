/**
 * Avatar & Media assets — extracted from Figma color styles.
 * Each entry has a name and a CDN image URL.
 */


export type AvatarCategory =
  | "Avatar company logo"
  | "Media Footage"
  | "Female Avatar"
  | "Group Avatar"
  | "Male Avatar"
  | "Gif Footage"
  | "Sticker Footage";

export interface AvatarAsset {
  name: string;
  imageUrl: string;
}

export const avatarRegistry: Record<AvatarCategory, AvatarAsset[]> = {
  "Avatar company logo": [
    { name: "3Portals", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4b3e8f24-8653-4cee-b8eb-0a89518b70bc" },
    { name: "Acme Corp", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/eae094de-71b4-408b-be02-aa2236c83c8f" },
    { name: "Boltshift", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b4214bda-d81f-49c1-b446-c895cb969d64" },
    { name: "Clandestine", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0e6439b4-c306-412f-83e5-c96bf7672422" },
    { name: "Codecraft_", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/587397ad-8caa-46df-bf41-fe80f0085202" },
    { name: "Convergence", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e345379d-e2fe-4545-aada-79554ad70c27" },
    { name: "Euphoria", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4bda2565-1785-4e15-9250-78f2c9f2e050" },
    { name: "Flora&Fauna", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/aa82926f-b328-4443-b1d0-f9240ecce9e7" },
    { name: "Foresight", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c1ac35d7-14b4-44d7-b51d-5c9e6dcb3a63" },
    { name: "Goodwell", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/550809f5-84ea-441c-9ca5-ae73360e7a01" },
    { name: "Hexsmith", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5c285942-3a6e-4a55-be27-e1134935aae3" },
    { name: "Ikigai Labs", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0a0254c4-cd4e-4fa0-b03e-38c999183d8b" },
    { name: "ImgCompress", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8fd877d4-eb8d-45ab-92fd-be2d884025f0" },
    { name: "Luckycharm", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5f1a95d3-d692-4e2c-85a5-b5df0744b26a" },
    { name: "Mastermail", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f1dfe00a-54a1-4302-9a27-5da5e491f6db" },
    { name: "Nietzsche", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/71f52372-2020-45fd-a9d6-661803caa046" },
    { name: "Ollio", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/aaabb221-24d3-488d-a732-a69023969758" },
    { name: "Pollinate", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9e653e41-12fc-4983-af83-7db8a86e5d3d" },
    { name: "Quantum²", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/de2eb5b5-25c8-4220-8d5e-d748fb4e28da" },
    { name: "Railspeed", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f398348c-9adf-42c9-93c6-300318734e87" },
    { name: "Shutterframe", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bd9fcf94-c5c6-4ff9-a57c-caaa84af6b43" },
    { name: "Solaris Energy", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d4241df3-5ece-444d-9a90-e9c41ffb2423" },
    { name: "Warpspeed", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f36e605a-1403-492d-959e-80d6c6293b9e" },
    { name: "Wildcrafted", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a0c3eb2f-f634-43b8-bf52-1647a5b9c4c8" },
  ],
  "Media Footage": [
    { name: "Media 02", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4fc4f92e-1273-4695-9212-9ecad5b0e4b7" },
    { name: "Media 03", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/219ae09e-7eac-4a0a-bcbb-10552c1ee531" },
    { name: "Media 04", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/097eae8e-e136-4b3e-a162-1bf9a960bf46" },
    { name: "Watch 01", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0fc4a0de-e4dc-4cfd-ba7f-35d799b05451" },
  ],
  "Female Avatar": [
    { name: "Camilla Juliette", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8a512421-65ce-420c-8478-06396f493956" },
    { name: "Emma Rose", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b73199c2-91b1-46e4-9849-b3fea799e498" },
    { name: "Gabriella Elise", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6beb722b-11db-4be8-9f1a-60157b76feb9" },
    { name: "Isabella Fleur", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f042da7c-47b9-4d5a-9ae4-afaee0e437c3" },
    { name: "Jennifer Lynn", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5465792f-83e4-48ed-aeb1-81826c8b5637" },
    { name: "Jessica Lane", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f82649c4-8036-49c4-b556-7556fc5f13d0" },
    { name: "Lily Anne", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3cc0d8a3-adc7-4d66-b3c2-8b5e71249852" },
    { name: "Mia Ward", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/79cab7d9-5166-4346-b2d3-937799c93f31" },
    { name: "Nancy Grace", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ece68a86-cd09-4d5a-8cc0-8177fb746d51" },
    { name: "Nora Claire", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d4ff54fe-05b9-4337-904a-0dbd8a814843" },
    { name: "Olivia Rhye", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b60e177f-bcc7-43b0-a1d1-7c1a6cac50ea" },
    { name: "Safiya Fareena", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/881c5ae0-07f1-429f-9ca6-9b225a36df2e" },
    { name: "Seraphina Belle", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/20e1f95c-0636-44b0-ad69-4a8caea0b678" },
    { name: "Sophia Claire", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/af3d46b9-7778-4625-8622-a4eee9f33824" },
    { name: "Tessa Joseph", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6ec49d28-b048-4b70-998a-704b166c1837" },
    { name: "Victoria Elise", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9c89fde4-4b47-4281-ae54-4349dec4fc95" },
  ],
  "Group Avatar": [
    { name: "Artistic Design", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c80517c7-0e19-46cb-80f8-866dd55ee68c" },
    { name: "Bright Mind", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2b55ebc2-f0e9-4f79-a1ac-5e6a9a2f074f" },
    { name: "Code Craze", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7ce70bef-38cf-461c-80a0-a4b14b6ec99d" },
    { name: "Creative Event", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5c7d720e-5c38-4d6e-9a1f-a4c763906dd5" },
    { name: "Design Duo", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7befeb31-6dff-4aed-9d97-70732bf6a5e5" },
    { name: "Epic Game", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f0a8324c-a74e-4f49-bbc7-de307d3d5dde" },
    { name: "Future Technology", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8728710b-4580-4f9f-b478-fcfd92cbc491" },
    { name: "Health Haven", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d067b9d3-a3bf-4606-8d90-f63501cd8ab6" },
    { name: "Innovative Online Shopping", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a844d7d4-99d1-44e7-b590-75651af9ee51" },
    { name: "Mind Body Wellness", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f7312f8f-f549-488a-8617-3ee46cb0c253" },
    { name: "Skill Sphere", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b7f41e7d-8eba-4ffc-a339-99c067147a32" },
    { name: "Startup World", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/55acd5a2-314a-4a30-80d0-30a610318fc1" },
    { name: "Teach Tech", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dfac3b7d-cbca-44d4-9a1f-e5629636dc21" },
    { name: "True Love Connections", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/707de7be-6a3d-4051-a55c-4d02ee3c4737" },
    { name: "Uber Cars", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5778d2b1-525e-4d5e-a3bf-9fa916db63be" },
    { name: "Well Wave", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a70540e0-c0a3-4cd0-ba25-f548ef457759" },
  ],
  "Male Avatar": [
    { name: "Ben Scott", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/372046b5-d139-481f-af89-d0da48d8ed66" },
    { name: "Brian Michael", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3223b13b-8da5-40a7-ba35-2fb478831a01" },
    { name: "Chris Nolan", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fe6063f5-b0e9-4c97-8d2a-309408cbebd0" },
    { name: "Daniel Brooks", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9defc5dd-e195-47eb-b44d-49f28a0be10f" },
    { name: "David Miller", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/592e64d8-3fa2-4f1a-aedc-25c597e68292" },
    { name: "George Alan", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/244a2d9e-d81e-4045-9087-632cb75bd66b" },
    { name: "James Anderson", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a27ff536-c9c7-4b5b-a1d1-5cd76fa9822c" },
    { name: "John Paul", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e53e4dbb-708a-4207-8ad7-2513a9252b24" },
    { name: "Leo Martin", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/58a50151-65c8-4d58-aefd-94573d3940b5" },
    { name: "Maxwell Tan", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4f692f8e-5e7e-40f3-a9f1-6ec135a23a1b" },
    { name: "Michael Scott", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f4ffc1b4-9f4f-493e-98d3-bef8eeb782f9" },
    { name: "Muhammed Fareed", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cb8e945a-3e8d-4fe3-9b7d-e61de9f991c2" },
    { name: "Paul David", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ae968b05-649d-413f-bbb1-05bf973a4783" },
    { name: "Robert Allen", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/20b39033-43e2-407a-8d40-304dccb07225" },
    { name: "Sam Wilson", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cf8090fb-5ca1-48fb-898e-36a8a0ed9258" },
    { name: "Thomas Bennett", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/41e97810-b120-49d3-a466-fbb45e0c9d8a" },
  ],
  "Gif Footage": [
    { name: "Gif 01", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/94ddf8ac-3df2-493c-bc82-41af1c125df8" },
    { name: "Gif 02", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d7be169e-2ec5-4c88-9f30-08a2e2e4649c" },
    { name: "Gif 03", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dcca61cd-967b-4166-8550-bb8f6cefa62e" },
    { name: "Gif 04", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2a009bc7-f773-42c9-97ff-8703ff13cf9e" },
  ],
  "Sticker Footage": [
    { name: "Sticker 01", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b93ef91c-07e3-4c69-8c3b-abe87a2007bf" },
    { name: "Sticker 02", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/82839107-6efc-4a55-a53d-da2460f7111c" },
    { name: "Sticker 03", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/99d357d1-7499-4f9d-806d-b0e28e4fc953" },
    { name: "Sticker 04", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9c81c176-7d75-47ec-90a2-22df905a8cb0" },
    { name: "Sticker 05", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/07293b78-a1d8-489c-ad60-0d3a1a25ccc4" },
    { name: "Sticker 06", imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/df84d621-8da9-4e3c-b732-9118ab70eb24" },
  ],
};

export const avatarCategories: AvatarCategory[] = ["Avatar company logo", "Media Footage", "Female Avatar", "Group Avatar", "Male Avatar", "Gif Footage", "Sticker Footage"];
export const avatarTotalCount = 86;
