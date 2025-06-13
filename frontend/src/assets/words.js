const wordList = [
  { word: "Saya", score: 15 },
  { word: "Di", score: 5 },
  { word: "Yang", score: 10 },
  { word: "Ini", score: 10 },
  { word: "Tidak", score: 15 },
  { word: "Dia", score: 10 },
  { word: "Itu", score: 10 },
  { word: "Dan", score: 10 },
  { word: "Kamu", score: 15 },
  { word: "Aku", score: 10 },
  { word: "Tom", score: 10 },
  { word: "Ke", score: 5 },
  { word: "Ada", score: 10 },
  { word: "Akan", score: 15 },
  { word: "Adalah", score: 20 },
  { word: "Dari", score: 15 },
  { word: "Apa", score: 10 },
  { word: "Orang", score: 20 },
  { word: "Pergi", score: 15 },
  { word: "Dalam", score: 15 },
  { word: "Bisa", score: 15 },
  { word: "Hari", score: 15 },
  { word: "Anda", score: 15 },
  { word: "Pada", score: 15 },
  { word: "Karena", score: 20 },
  { word: "Apakah", score: 20 },
  { word: "Ingin", score: 15 },
  { word: "Lebih", score: 15 },
  { word: "Sangat", score: 15 },
  { word: "Sudah", score: 15 },
  { word: "Sedang", score: 20 },
  { word: "Jalan", score: 15 },
  { word: "Bahasa", score: 20 },
  { word: "Rumah", score: 15 },
  { word: "Mereka", score: 15 },
  { word: "Makan", score: 15 },
  { word: "Kita", score: 15 },
  { word: "Banyak", score: 15 },
  { word: "Harus", score: 15 },
  { word: "Kami", score: 15 },
  { word: "Dua", score: 10 },
  { word: "Tahun", score: 15 },
  { word: "Buku", score: 15 },
  { word: "Anak", score: 15 },
  { word: "Juga", score: 15 },
  { word: "Oleh", score: 15 },
  { word: "Menjadi", score: 20 },
  { word: "Saat", score: 10 },
  { word: "Satu", score: 10 },
  { word: "Memiliki", score: 20 },
  { word: "Suka", score: 10 },
  { word: "Lalu", score: 10 },
  { word: "Datang", score: 15 },
  { word: "Malam", score: 15 },
];

export function getRandomWord(exclude = []) {
  const filteredList = wordList.filter(item => !exclude.includes(item.word));

  if (filteredList.length === 0) {
    throw new Error("No available words to choose from after exclusion.");
  }

  const randomIndex = Math.floor(Math.random() * filteredList.length);
  return filteredList[randomIndex];
}
