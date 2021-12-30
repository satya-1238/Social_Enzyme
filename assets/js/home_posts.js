{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                   let newPostCreated=newPostDom(data.data.post);
                   $('#posts-list-container>ul').prepend(newPostCreated);
                   deletePost($(' .delete-post-btn',newPostCreated))

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom=function(post){
        return $(`
        <link rel="stylesheet" href="/css/post.css">
<li class="break-line" id="post-${post._id}">
    <p class="post-content">
        <small>
            <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
        </small>
        <small>
            ${post.user.name}
        </small>
        <br>
        ${post.content}
    </p>
    <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here ..." required class="content">
                <input type="hidden" name="post" value="${post._id}" >
                <input type="submit" value="Add Comment" class="submit">
            </form>

        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
    </div>
    
</li>`)
    }
//   Method to delete  a post from DOM
let deletePost=function(deleteLink)
{
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data)
            {
                  $(`#post-${data.data.post_id}`).remove();
            },
            error:function(err)
            {
                console.log(err.responseText);
            }

        })
    })
}
    createPost();
}