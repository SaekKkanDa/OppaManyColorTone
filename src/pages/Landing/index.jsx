import { doc, getDoc } from 'firebase/firestore';
import { db } from '/src/firebase';

function LandingPage() {
    const onClickBtn = async () => {
        const docRef = doc(db, 'numberOfUsers', 'numberOfUsers');
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().numberOfUsers);
    };

    return <button onClick={onClickBtn}>유저 사용자 수</button>;

    // return <div>this is landing page</div>;
}

export default LandingPage;
