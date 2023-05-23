import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "store";
import { fetchPosts, fetchUserPosts } from "services/api";
import PostWidget from "pages/Widgets/PostWidget";

const PostsWidget = ({ userId, isProfile }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getAllPosts = async () => {
        const data = await fetchPosts({ token });
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const data = await fetchUserPosts({ token, userId });
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    }, [userId]);

    return (
        <>
            {
                posts.map(({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                    createdAt
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                        createdAt={createdAt}
                    />
                )
                ).reverse()
            }
        </>
    )
};

export default PostsWidget;