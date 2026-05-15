import img1 from '../assets/img1.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import img5 from '../assets/img5.png'
import img6 from '../assets/img6.png'
import img7 from '../assets/img7.png'
import img8 from '../assets/img8.png'

export const getColorByWeatherId = (weatherId) => {
    if (weatherId == 800) return img1 // 맑음: 따뜻한 노랑(amber-300)

    const group = Math.floor(weatherId / 100)
    switch (group) {
        case 2: // 뇌우: 어두운 하늘 + 인디고 번쩍
            return img8
        case 3: // 이슬비: 옅은 청록 → 연한 하늘
            return img7
        case 5: // 비: 블루 톤 딥 → 라이트
            return img6
        case 6: // 눈: 화이트에 살짝 아이스블루
            return img5
        case 7: // 안개/먼지: 소프트 그레이 → 블루그레이
            return img4
        case 8: // 구름: 라이트 슬레이트 → 미드 슬레이트
            return img3
        default: // 예외
            return img1
    }
}