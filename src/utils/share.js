// only working in https
export async function webShare() {
    const shareData = {
        title: '오빠 톤 많아?',
        text: '퍼스널 칼러를 찾아보세요',
        url: location.href,
    }

    return navigator.share(shareData)
}