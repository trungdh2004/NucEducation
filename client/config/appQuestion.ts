export const typeQuestion = [
  {
    name: "Đáp án duy nhất",
    value: "SGQ",
  },
  {
    name: "Nhiều đáp án đúng",
    value: "MTQ",
  },
  {
    name: "Điền vào ô trống",
    value: "BLANK",
  },
];

export const timeQuestion = [
  {
    name: "10 giây",
    value: 10000,
  },
  {
    name: "20 giây",
    value: 20000,
  },
  {
    name: "30 giây",
    value: 30000,
  },
  {
    name: "40 giây",
    value: 40000,
  },
  {
    name: "50 giây",
    value: 50000,
  },
  {
    name: "1 phút",
    value: 60000,
  },
];

export const appDifficultyQuiz = [
  {
    name: "Dễ",
    value: 1,
  },
  {
    name: "Trung bình",
    value: 2,
  },
  {
    name: "Khó",
    value: 3,
  },
];

export const getDifficulty = (value: number) => {
  return appDifficultyQuiz.find((item) => item.value === value);
};
