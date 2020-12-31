const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalclose = document.getElementById('close-icon');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteName = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
let bookmarksArr = [];




//show or hide modal

function showModal()
{
    modal.classList.add("show-modal");
    
}

//validating url
function validateURL(name,urlValue)
{
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    var regex = new RegExp(expression);
   
    if(!name || !urlValue)
    {
        alert("Please Submit values for both fields!");
        return false;
    }

    if(!urlValue.match(regex))
    {
        alert("Please provide a valid URL link !");
        return false;
    }

    //valid

    return true;
}

//building bookmarks 

function buildBookmark()
{
    bookmarksContainer.textContent = '';

    bookmarksArr.forEach((bookmarks)=>
    {
        const {name,url} = bookmarks;
        console.log(name,url);

        //item

        const item = document.createElement('div');
        const item2 = document.createElement('div')
        item.classList.add('item');
        item2.classList.add('item-container');

        //favicons
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','favicon');

        //links

        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.setAttribute('id','bookmark-link');
        link.textContent = name;

        //trash icon
        const trashBin = document.createElement('span');
        trashBin.setAttribute('id','split-delete');
        trashBin.setAttribute('onclick',`deleteBookmark('${url}')`);

        //fa fa-icon
        const icon = document.createElement('i');
        icon.classList.add('fas','fa-trash-alt');
        icon.setAttribute('title','Delete Bookmark');
       


        //appending to the containers

        trashBin.appendChild(icon);
        item2.append(favicon,link);
        item.append(item2);
        bookmarksContainer.append(item,trashBin);
    });
   
}

//getting data from local storage

function fetchData()
{
    if(localStorage.getItem('bookmarks'))
    {
        bookmarksArr = JSON.parse(localStorage.getItem('bookmarks'));
    }

    else
    {
        bookmarksArr = [
            {
                name : 'Facebook',
                url : 'https://www.facebook.com/',

            },
        ];
        localStorage.setItem('bookmark',JSON.stringify(bookmarksArr));
    }

    buildBookmark();

   
}

function bookmarkFormData(e)
{
   e.preventDefault();
   const name = websiteName.value;
   let urlData = websiteUrl.value;
   if(!urlData.includes('htpp://','https://'))
   {
       urlData = `https://${urlData}`;
   }

   if(!validateURL(name,urlData))
   {
       return false;
   }

   const bookmark = {
       name:name,
       url:urlData,
   };


   bookmarksArr.push(bookmark);
   localStorage.setItem("bookmarks",JSON.stringify(bookmarksArr));
   fetchData();
   bookmarkForm.reset();
   websiteName.focus();

}

//delete bookmark

function deleteBookmark(url)
{
    bookmarksArr.forEach((bookmark,i)=>{
        if(bookmark.url === url)
        {
            bookmarksArr.splice(i,1);
        }
    });

    localStorage.setItem("bookmarks",JSON.stringify(bookmarksArr));
    fetchData();
}

//event listeners for showing modal

modalShow.addEventListener("click",showModal);
modalclose.addEventListener("click",()=>modal.classList.remove("show-modal"));
window.addEventListener("click",(e)=>e.target===modal ? modal.classList.remove("show-modal"):false);
bookmarkForm.addEventListener("submit",bookmarkFormData)


//onload 

fetchData();

