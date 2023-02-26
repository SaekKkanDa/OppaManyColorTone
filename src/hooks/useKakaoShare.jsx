import { useState, useEffect, useCallback } from 'react';

import { initKakaoSDK, shareKakaoDefault } from '@Utils/kakaoShare'

function useKakaoShare() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await initKakaoSDK();

            setIsLoading(false);
        })();
    }, [])

    const kakaoShare = useCallback(() => {
        if (isLoading) return;
        shareKakaoDefault();
    }, [isLoading])


    return { isLoading, kakaoShare }
}



export default useKakaoShare;