import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'react-bootstrap';
function Data() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://www.reddit.com/r/reactjs.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPosts(data.data.children);
                setLoading(false);
            })
            .catch((e) => {
                console.error("Error fetching data:", e);
                setLoading(false);
            });
    }, []);

    function stripHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    return (
        <div className="container p-3 m-3 " style={{ maxWidth: '100vw' }}>
<nav className="navbar navbar-dark bg-primary mb-4">
  <span className="navbar-brand mb-0 h1 mx-auto">ReactJS Reddit Feed</span>
</nav>


            <div className="row my-3">
                {loading && (
                    <div className="d-flex justify-content-center align-items-center" >
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>


                )}
                {!loading && posts?.length > 0 ? (posts?.map((post) => (
                    <div key={post.data.id} className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-6 mb-3 ">
                        <Card className="h-100">
                            <CardHeader className="text-center">
                                <h6>{post.data.title}</h6>
                            </CardHeader>

                            <CardBody>
                                <div style={{ maxHeight: '100px', overflow: 'hidden' }}>
                                    {post.data.selftext_html ? (
                                        <div className="post-text">
                                            {stripHtml(post.data.selftext_html).length > 150
                                                ? stripHtml(post.data.selftext_html).substring(0, 150) + '...'
                                                : stripHtml(post.data.selftext_html)}
                                        </div>
                                    ) : (
                                        <p>No post text</p>
                                    )}
                                </div>

                                <p className="mt-2">
                                    <a href={post.data.url} target="_blank" rel="noopener noreferrer">
                                        Visit URL
                                    </a>
                                </p>

                                <p><strong>Score:</strong> <span className="badge text-danger bg-light">{post.data.score}</span></p>
                            </CardBody>



                        </Card>
                    </div>
                ))) : (
                    <p className='d-flex justify-content-center'> No Posts Available</p>

                )}
            </div>
        </div>

    );
}


export default Data;
