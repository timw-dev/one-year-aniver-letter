"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "./Envelope";
import { Background } from "./Background";
import { HeaderTitle } from "./HeaderTitle";
import { HeartTransition } from "./HeartTransition";
import { DecorationLayer } from "./DecorationLayer";
import { PageFlipContainer, LetterPageData } from "./letter/LetterEcosystem";
import { MemorySlot } from "./memory/MemoryCard";
import { MusicMiniPlayer } from "./audio/MusicMiniPlayer";
import { Foreground } from "./Foreground";
// import Perfect from '../assets/music/perfect.mp3';

const letterPages: LetterPageData[] = [
  {
    greeting: "Ngoan xinh yêu của anh \nđâu ùiii ❤️❤️❤️",
    paragraphs: [
      "Có phải là đang nghĩ anh quên mất ngày hôm nay không hehe :3 Hong cóa dễ thế đâu :3 Anh không chắc nên tính từ hôm nào nựa, em có thấy bức ảnh ngay bên trái này không? Ngày đầu tiên mình va phải nhau đó ❤️",
      "Sau đó thì phần còn lại là lịch sử :3",
      "Anh hong cóa tìm thấy ảnh lần đầu em mang cho anh hộp dâu đầu tiên nữa rùi :< chắc đang trên drive cũ thuii, nhưng mà nhanh thiệt đóa, vèo cái mà đã một năm ngày mình quen nhao rùi :>",
      "Cùng liệt kê lại một số lần đầu mà tụi mình đã cùng nhau trải qua nhó, ảnh từ hồi đi học chưa có chụp photobooth nè, xong rùi lần đầu photobooth, đi coi phim thường rùi tới 3DMax, rồi dần dần nhiều hơn nhiều hơn những lần cùng nhau có những bức ảnh đẹp mà anh hong có hiện hết ở đây được aáa",
    ],
    moreText: "Click để đọc tiếp nè :3",
    memories: [
      {
        id: "p1_1",
        type: "image",
        src: "/imgs/first_mess.jpg",
        title: "First Message",
        position: "left-top",
      },
      {
        id: "p1_2",
        type: "image",
        src: "/imgs/first_ptb.jpeg",
        title: "First Photobooth",
        position: "right-top",
      },
      {
        id: "p1_3",
        type: "image",
        src: "/imgs/random_daily5.jpeg",
        title: "Study Together",
        position: "right-mid",
      },
      {
        id: "p1_4",
        type: "image",
        src: "/imgs/better_ptb.WEBP",
        title: "Another Photobooth but better..",
        position: "right-bottom",
      },
      {
        id: "p1_5",
        type: "image",
        src: "/imgs/first_3dmax.jpeg",
        title: "First time Avatar 3DMax",
        position: "left-mid",
      },
      {
        id: "p1_6",
        type: "image",
        src: "/imgs/long_distance.jpeg",
        title: "Long trip kisses..",
        position: "left-bottom",
      },
    ],
  },
  {
    paragraphs: [
      "Cứ vậy cứ vậy rùi mình\ncùng nhau trải nghiệm nhiều hơn, tốt hơn\nrùi tình cảm của tụi mình cũng cứ vậy mà\nlớn dần lớn dần lên haa.",
      "Bắt đầu từ nem nướng tới bún chả, trà sữa, cholibee,... hành trình tụi mình cứ thế mà tiếp tục rong ruổi khắp từ Hà Nội tới Lai Châu. Từ những khoảnh khác vui vẻ như vậy cho đến khi ăn tới mức đủ để đi khám bệnh luôn :<",
      "Vui buồn đủ cả, giận hờn cũng có nựa, nhưng mà sau tất cả em thấy hong, mình iu nhao được 1 năm rùi á, bây giờ nghĩ lại em thấy chặng hành trình này thế nào, thích hong, iu hong :3",
      "Có thể còn nhiều điểm thiếu sót, khoảng trống lúc tụi mình hong được gặp nhao do iu xa nè, nhưng sau tất cả anh mừng là tụi mình cũng đã cùng nhau có rất nhiều kỷ niệm đẹp để hai đứa trân trọng, và hơn hết là vẫn quyết định cùng nhau đồng hành ❤️",
    ],
    moreText: "Để xem còn gì nữa nè :3",
    memories: [
      {
        id: "p2_1",
        type: "image",
        src: "/imgs/first_birthday_w_u.jpeg",
        title: "First birthday with you",
        position: "left-top",
      },
      {
        id: "p2_2",
        type: "image",
        src: "/imgs/her_birthday.jpeg",
        title: "Your birthday",
        position: "right-top",
      },
      {
        id: "p2_3",
        type: "image",
        src: "/imgs/family_pic.JPG",
        title: "Family of us",
        position: "right-mid",
      },
      {
        id: "p2_4",
        type: "image",
        src: "/imgs/cholibee.jpg",
        title: "Cholibee, xân biển,...",
        position: "left-mid",
      },
      {
        id: "p2_5",
        type: "image",
        src: "/imgs/first_hospital.jpeg",
        title: "First hospital visit",
        position: "left-bottom",
      },
      {
        id: "p2_6",
        type: "image",
        src: "/imgs/hospital_2.jpg",
        title: "Second time to hospital",
        position: "right-bottom",
      },
    ],
  },
  {
    greeting: "",
    paragraphs: [
      "Sau tất cả, anh thực sự rất\nhạnh phúc khi có em đồng hành cùng anh\nngay những khoảnh khắc thường nhật ❤️",
      "Tương lai khó tránh còn nhiều chông gai với hai đứa mình, nhưng cũng sẽ còn rất nhiều quả ngọt sau đó mà hai đứa mình có thể cùng nhau gặt hái, anh mong mình sẽ luôn nắm chặt tay nhau vượt qua những khó khăn ấy, để sau tất cả, được thấy nhau bình yên như những hình ảnh này thôi :3",
      "Mình đã có tết đầu tiên, noel đầu tiên, sinh nhật đầu tiên và lần này là kỷ niệm một năm đầu tiên, tất cả đều sẽ có chữ 'bên nhau' ở cuối nựa. Anh mong là mình sẽ đều nói với nhau thật nhiều 'Yes I do!' sau này :3 để cùng nhau có thật nhiều những cột mốc đáng nhớ nữa haaa ❤️",
      "Hà Nội, Lai Châu, Hải Phòng hay ở cùng nhau đến đâu đi nữa... Mình sẽ có thật nhiều khoảnh khắc bình yên và hạnh phúc như vậy nhé ❤️❤️❤️",
    ],
    signature: ["Iu em nhấtt,", "Cuddle bug ❤️ aka ❤️ ", "chúc chích to"],
    memories: [
      {
        id: "p2_1",
        type: "image",
        src: "/imgs/random_daily1.jpg",
        title: "Hồ Teyyy",
        position: "left-top",
      },
      {
        id: "p2_2",
        type: "image",
        src: "/imgs/random_daily2.jpg",
        title: "Random happy dailys :3",
        position: "right-top",
      },
      {
        id: "p2_3",
        type: "image",
        src: "/imgs/I_do.png",
        title: "❤️She said 'YESS I dooo!' ❤️",
        position: "right-mid",
      },
      {
        id: "p2_4",
        type: "image",
        src: "/imgs/random_daily4.jpg",
        title: "Random happy dailys :3",
        position: "left-mid",
      },
      {
        id: "p2_5",
        type: "image",
        src: "/imgs/random_daily7.jpg",
        title: "Random happy dailys :3",
        position: "left-bottom",
      },
      {
        id: "p2_6",
        type: "image",
        src: "/imgs/random_daily6.jpeg",
        title: "Zoootreee",
        position: "right-bottom",
      },
    ],
  },
];

export default function IntroPhase() {
  const [step, setStep] = useState<number>(0);
  const [isSceneReady, setIsSceneReady] = useState(false);

  // State mới điều khiển Nhạc và Trang hiện tại
  const [startMusic, setStartMusic] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsSceneReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEnvelope = () => {
    if (step !== 0 || !isSceneReady) return;

    setStartMusic(true); // GỌI LỆNH PHÁT NHẠC TẠI ĐÂY!
    setStep(1);

    setTimeout(() => {
      setStep(2);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen bg-rose-50/30 overflow-hidden flex items-center justify-center min-w-[1280px]">
      <HeaderTitle phase={step >= 3 ? "reading" : "enter"} />
      <Background step={step} />
      {step <= 2 && <Foreground />}

      {/* Trang trí nền (Chỉ hiện khi đang đọc thư) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <DecorationLayer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mảng 6 Ảnh Kỷ Niệm xung quanh (Render dựa trên currentPage) */}
      <AnimatePresence>
        {step >= 3 &&
          letterPages[currentPage].memories.map((mem) => (
            // Dùng key là mem.id để khi lật trang, ảnh cũ bay đi, ảnh mới bay vào mượt mà
            <MemorySlot key={mem.id} item={mem} />
          ))}
      </AnimatePresence>

      {/* Phong bì */}
      <AnimatePresence>
        {step < 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isSceneReady ? 1 : 0,
              scale: isSceneReady ? 1 : 0.95,
            }}
            className={`absolute z-20 flex items-center justify-center w-full h-full ${isSceneReady ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <Envelope isOpened={step >= 1} onClick={handleOpenEnvelope} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tim che màn hình */}
      {step >= 2 && step < 4 && (
        <HeartTransition onCovered={() => setStep(3)} />
      )}

      {/* Lá Thư Lật Trang */}
      <AnimatePresence>
        {step >= 3 && (
          <PageFlipContainer
            pages={letterPages}
            onPageChange={setCurrentPage}
          />
        )}
      </AnimatePresence>

      <MusicMiniPlayer
        songSrc="/music/perfect.mp3"
        title="Perfect"
        artist="Ed Sheeran"
        forcePlay={startMusic}
      />
    </div>
  );
}
