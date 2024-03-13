import axios from 'axios';
import Image from 'next/image';
import { IChallenge } from '../api/getChallenge';

interface Props {
  challengeGetData: IChallenge[];
}

function Test({ challengeGetData }: Props) {
  return (
    <div>
      {challengeGetData.map((challenge) => (
        <div key={challenge.id}>
          <p>{challenge.title}</p>
          <p>{challenge.description}</p>
          <Image
            src={challenge.thumbnail}
            alt="챌린지 이미지"
            width={300}
            height={300}
            priority
          />
          <p>{challenge.startDate}</p>
          <p>{challenge.endDate}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(): Promise<{
  props: { challengeGetData: IChallenge[] };
}> {
  try {
    const response = await axios.get<IChallenge[]>(
      'http://localhost:3000/api/getChallenge',
    );
    const { data } = response;
    return {
      props: {
        challengeGetData: data,
      },
    };
  } catch (error) {
    console.error('데이터를 불러오지 못했습니다.', error);
    return {
      props: {
        challengeGetData: [],
      },
    };
  }
}
export default Test;
