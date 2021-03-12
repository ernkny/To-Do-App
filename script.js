//Get vars


const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
//localStorage.clear();
let items;

// Fonksiyon çalıştır!
loadItems();
eventListeners();


// buton tıklamaları sonucu oluşan event kontrolü
function eventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteOldItem);
    deleteAll.addEventListener('click', deleteAllItems);
}


//  Var ise Girinlen bilgilerin local storage kaydının alınması
function getItemSFromLS() {

    // local storageten gelen item boş ise array dönerdürülür değil ise gelen bilgiler json formatı ile çekilir ve döndürülür.
    if (localStorage.getItem('items') === null) {
        items = [];

    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;

}


// çekilen bilgiler  getItemSFromLS fonksiyonundan alınarak oluşturulmak üzere her bir bilgi CreateNewItem fonksiyonuna gönderilir.
function loadItems() {
    items = getItemSFromLS();

    items.forEach(function(item) {
        CreateNewItem(item);
    })
}

//kullanıcı tarafından girilen bilgiler local storage üzerine yazılır.
function setItemsLS(text) {
    if (text != '') {
        items = getItemSFromLS();
        items.push(text);
        localStorage.setItem('items', JSON.stringify(items));
    }

}

function CreateNewItem(text) {

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.textContent = text;

    const a = document.createElement('a');
    a.className = "delete-item float-right";
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>'

    li.appendChild(a);
    taskList.appendChild(li);

    setItemsLS(input.value);



}

function addNewItem(e) {

    if (input.value != '') {


        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.textContent = input.value;

        const a = document.createElement('a');
        a.className = "delete-item float-right";
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fas fa-times"></i>'

        li.appendChild(a);
        taskList.appendChild(li);
        setItemsLS(input.value);
        input.value = '';




    } else alert('Lütfen Bir İtem Ekleyiniz!');


    e.preventDefault();


}

function deleteItemsFromLS(deleteText) {
    items = getItemSFromLS();
    items.forEach(function(item, index) {
        if (item == deleteText)
            items.splice(index, 1);
    })
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteOldItem(e) {

    if (e.target.className == 'fas fa-times') {
        e.target.parentElement.parentElement.remove();

        deleteItemsFromLS(e.target.parentElement.parentElement.textContent);


    }

    e.preventDefault();
}


function deleteAllItems(e) {

    if (confirm('Hepsini Silmekte Emin misin?')) {
        // taskList.innerHTML = ''; 1. Çözüm

        // 2. çözüm
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();


}