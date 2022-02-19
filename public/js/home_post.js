{
        // console.log('Hello');
        //getting data from form and preventing it to submit data automatically
    let createpost = function(){
        let newPost = $('#new_post');
        //want to submit manually
        // console.log('Hello');
        newPost.submit(function(e){
            e.preventDefault();           //prevent 

            //submitting via ajax
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPost.serialize(),//serailize the data,convert in json
                success:function(data){
                    // console.log(data);
                    let newPosts = newDom(data.data.post);
                    $('#posts').prepend(newPosts);
                    deletePost($(' .postDelete',newPost));
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    //method to create post in dom
    let newDom = function(post){
        return $(`<li id="post-${post._id}">
                <h5>${post.title}</h5>
                <p>${post.content} 
                <em>By ${post.user.name}</em></p>
                <a href="/post/delete/${post._id}"><img id="postDelete" src="https://cdn-icons.flaticon.com/png/512/484/premium/484662.png?token=exp=1645220086~hmac=f60fd19979ee06f494c5c7f35f3eb2f2"></a>
               `)
    }   

    //method to delete post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.postId}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createpost();
}