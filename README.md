# My Jazz Club

**WEBSITE**: https://my-jazz-club.herokuapp.com/


### Contents

* [Overview](#overview)
* [Tech stack](#tech-stack)
* [Description](#description)



## Overview

**My Jazz Club** is a **CMS (content management system) for music club websites** including an example of a home page for a jazz club. I developed it during my participation on SPICED Academy (Berlin), a 12-week coding bootcamp focused on full stack JavaScript web development. This was my final project, which helped me to strengthened my knowledge of ReactJS and ReduxJS.

My goal with this project was to create an application which would allow anyone without programming knowledge to manage his/her own commercial website in an easy manner, through a pleasing interface and obtaining attractive results.

I chose it to be jazz themed because I really like this kind of music.

**Time frame:** 1 week



## Tech stack:

- **Frontend**: ReactJS, ReduxJS.
- **Backend**: NodeJS, ExpressJS.
- **Databases**: PostgreSQL, AWS S3.



## Description



### 1. Front website

The **landing page** presents a panoramic view of the club, with the page title and a navigation bar containing the usual sections any wbsite of a music club contains (about, program, gallery, contact).

![Screen Shot 2017-12-01 at 14.38.13](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/Screen Shot 2017-12-01 at 14.38.13.png)



Through the *Program* link we access the **Program Page** dispalying the list of current shows programmed in the club. Each show card displays the date of the event, the picture of the artist and the title of the event.

![myjazzclub-program](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-program.gif)



Clicking on the month-buttons we can **filter the list** of shows displayed by month. Clicking on 'ALL' we remove the filter.



Clicking on a particular show card takes us to the **individual show page**, which contains more detailed information about the event, like price and hour, as well as a more extensive description of the show.

![myjazzclub-show-view](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-show-view.gif)



Through the *Gallery* link we access the **Gallery Page** with pictures of past concerts. When hovering on a picture we can see the title, date and description of the picture.

![myjazzclub-gallery](/Users/rauliglesias/Documents/Dev/myjazzclub/public/README-gifs/myjazzclub-gallery.gif)



### 2. Admin Dashboard

The key feature of the website, the **Admin Dashboard**, can be accessed through the login form, which is displayed on clicking on the *Admin Login* button of the footer.

The Admin Dashboard consists of two parts: the Show Editor and Gallery Manager, which allow us to manage the content of sections of the website we have already seen. All changes happen real time, both on the data base, as well as on the Dashboard page.

![myjazzclub-login](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-login.gif)



**SHOW EDITOR**

The first part we see after logging in is the **Show Editor**. This part of the application displays all the shows booked (right side), as well as a form containing all the details of the show (left side).

The dropdown above the list of shows allows filtering the event by month, to ease the searching of particular show.

![myjazzclub-show-editor-overview](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-show-editor-overview.gif)



Clicking on a show on the list gives us access to its content, which can be **edited directly on the form** and saved clicking on the *submit* button. We can as well change the picture assigned to the event.

![myjazzclub-show-editor-edit-show](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-show-editor-edit-show.gif)



The button **New Show** clears the form and allows creating a whole new show. After entering the information and setting a picture, the show is submitted and automatically saved on the data base. The now show will appear as a new card on the Program section of the home page.

![myjazzclub-show-editor-new-show](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-show-editor-new-show.gif)



**GALLERY MANAGER**

The second part of the Admin Dashboard is the **Gallery Manager**. We can access this section by clicking on the toggle button on top of the page.

Here is where we can upload new pictures of past shows, which will be displayed on the Gallery section of the home page. This section allows us also to edit past pictures, changing its description or date.

![myjazzclub-gallery-manager-overview](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-gallery-manager-overview.gif)



In order to **upload a new picture** we just need to click on the button "New Picture", select a picture and edit its description. After saving it, the image and its additional information will be sent to the data base and displayed on the Gallery section of the home page.

![myjazzclub-gallery-manager-new-pic](https://github.com/Raulif/myjazzclub/blob/master/public/README-gifs/myjazzclub-gallery-manager-new-pic.gif)

# Contact

- Email: raul4cade@gmail.com
- Twitter: [@raulif](#https://twitter.com/raulif)
- LinkedIn: [Raul Iglesias](#https://www.linkedin.com/in/raul-iglesias-fourcade/)
