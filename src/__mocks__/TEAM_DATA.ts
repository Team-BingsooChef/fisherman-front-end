// constants/team.ts
interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  github: string;
}

export const TEAM_DATA: TeamMember[] = [
  {
    name: "고희연",
    role: "FE Developer",
    avatar: "https://avatars.githubusercontent.com/u/163094172?v=4",
    github: "https://github.com/catleap02",
  },
  {
    name: "이동윤",
    role: "FE Developer",
    avatar: "https://avatars.githubusercontent.com/u/174276728?v=4",
    github: "https://github.com/heydylee",
  },
  {
    name: "이상희",
    role: "BE Developer",
    avatar: "https://avatars.githubusercontent.com/u/102018082?v=4",
    github: "https://github.com/sanghee0820",
  },
  {
    name: "정현정",
    role: "BE Developer",
    avatar: "https://avatars.githubusercontent.com/u/117988360?v=4",
    github: "https://github.com/wgwjh05169",
  },
];
