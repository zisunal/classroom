import Skeleton from 'react-loading-skeleton'

function Loading() {
    return (
        <div className="wrapper">
            <header className='loader'>
                <div className="brand">
                    <Skeleton height={40} circle />
                </div>
                <div className="search">
                    <Skeleton height={40} />
                </div>
                <div className="menu">
                    <Skeleton height={40} />
                </div>
            </header>
            <main className='loader'>
                <div className="sidebar">
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                    <Skeleton height={"10%"} />
                </div>
                <div className="main">
                    <Skeleton height={"100%"} />
                </div>
            </main>
            <footer className="loader">
                <Skeleton height={40} baseColor='var(--black)' highlightColor='var(--hover-dark)' />
                <Skeleton height={40} baseColor='var(--black)' highlightColor='var(--hover-dark)' />
            </footer>
        </div>
    );
}

export default Loading;