//hight light trạng thái của Menu khi được chọn
function hightFooterAndNav() {
    $(".nav_item a").click(function () {
        $(".nav_item a.active").removeClass("active");
        $(this).addClass("active");
    });

    $(".footer ul li a").click(function () {
        $(".footer ul li a.active").removeClass("active");
        $(this).addClass("active");
    });
}

//Xử dùng đỏng mở phần News và cho phép thay đổi vị trí
function handleEventSide(){
    $(".news_item").accordion({
        header: ".section",
        collapsible: true,
        active: false,
        beforeActivate: function (event, ui) {
            ui.newHeader.addClass("active");
            ui.oldHeader.removeClass("active");
        },
    });
    $(".news_list").sortable({
        axis: "y",
        handle: ".section",
    });
}

//Chuyển môn học giữa hai danh sách bằng cách kéo thả
function handleDragSubjectTag() {
    $(".list_subjects").sortable({
        connectWith: ".list_subject_item",
    });
    $(".list_subject_item").draggable({
        connectToSortable: ".list_subjects",
        revert: "invalid",
        containment: ".main",
    });
}

//Chuyển môn học giữa hai danh sách bằng cách nhấn button
function handleSwitchSubjectTag() {
    $(".list_subject_item").click(function () {
        $(this).toggleClass("selected");
    });
    $(".switch_btn-right").click(function (e) {
        e.preventDefault();
        $(".list_subjects.not_selected .list_subject_item.selected").appendTo($(".list_subjects.selected"));
    });
    $(".switchAll_btn-right").click(function (e) {
        e.preventDefault();
        $(".list_subjects.not_selected .list_subject_item").appendTo($(".list_subjects.selected"));
    });
    $(".switch_btn-left").click(function (e) {
        e.preventDefault();
        $(".list_subjects.selected .list_subject_item.selected").appendTo($(".list_subjects.not_selected"));
    });
    $(".switchAll_btn-left").click(function (e) {
        e.preventDefault();
        $(".list_subjects.selected .list_subject_item").appendTo($(".list_subjects.not_selected"));
    });
}

//tắt hightlight khi focus vào ô input và reset form khi bấm button reset
function resetInputForm() {
    const inputElements = $(".form-control");
    inputElements.focus(function () {
        if ($(this).attr("name") == "sex") {
            console.log(1);
            $("input[name=sex]").each(function (index, elem) {
                $(elem).removeClass("invalid");
            });
        } else {
            $(this).removeClass("invalid");
        }
    });

    $(".btn-reset").click(function () {
        console.log("hello");
        inputElements.each(function (index, elem) {
            $(elem).removeClass("invalid");
        });
    });
}

//kiểm tra mã số có hợp lệ
function checkId(id) {
    if (!/^\d{8}$/.test(id)) {
        return false;
    }

    let num = parseInt(id.slice(0, 2));
    if (num < 17 || num > 22) {
        return false;
    }
    return true;
}

//kiểm tra họ tên và địa chỉ có hợp lệ
function checkFullNameAndAddress(string) {
    let arrWord = string.trim().split(" ");
    if (arrWord.length < 2) {
        return false;
    }

    return true;
}

//kiểm tra số điện thoại có hợp lệ
function checkNumberPhone(numberPhone) {
    if (!/^[0]\d{9}/.test(numberPhone)) {
        return false;
    }
    return true;
}

//kiểm tra email có hợp lệ
function checkEmail(email) {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
        return false;
    }
    return true;
}

//chuyển từ định dạng yyyy-mm-dd => dd/mm/yyy
function covertDate(birthday){
    let date = birthday.split("-");
    let year = date[0];
    let month = date[1];
    let day = date[2];
    return day + "/" + month + "/" + year;
}

//validatation Form
function validationForm() {
    const idInput = $("input[name=id]");
    const fullnameInput = $("input[name=fullname]");
    const addressInput = $("input[name=address]");
    const emailInput = $("input[name=email]");
    const numberPhone = $("input[name=phone]");
    const radioInputs = $("input[name=sex]");
    const birthdayInput = $("input[name=birthday]");
    let check = 1;
    let values = {};

    if (!checkId(idInput.val())) {
        idInput.addClass("invalid");
        check = 0;
    }

    if (!checkFullNameAndAddress(fullnameInput.val())) {
        fullnameInput.addClass("invalid");
        check = 0;
    }

    if (!checkFullNameAndAddress(addressInput.val())) {
        addressInput.addClass("invalid");
        check = 0;
    }

    if (!checkNumberPhone(numberPhone.val())) {
        numberPhone.addClass("invalid");
        check = 0;
    }

    if (!radioInputs.is(":checked")) {
        radioInputs.each(function(index, elem){
            $(elem).addClass('invalid');
        })
        check = 0;
    }

    if (!checkEmail(emailInput.val())) {
        emailInput.addClass("invalid");
        check = 0;
    }

    if (!birthdayInput.val()) {
        birthdayInput.addClass("invalid");
        check = 0;
    }

    if(check == 0){
        return false;
    }
    else{
        values.id = idInput.val();
        values.fullname = fullnameInput.val();
        values.birthday = covertDate(birthdayInput.val());
        values.sex = $('input[name=sex]:checked').val();
        return values;
    }
}

//Xử lý các logic khi form được submit
function handleSubmitForm() {
    const formRegister = $("#form-register");
    formRegister.submit(function(e) {
        e.preventDefault();
        if (!validationForm()) {
            console.log("Đăng kí thất bại");
        } else {
            let values = validationForm();
            $(".student_list").append(`
            <tr>
                <td>${values.id}</td>
                <td>${values.fullname}</td>
                <td>${values.sex}</td>
                <td>${values.birthday}</td>
            </tr>`);

            let listSubjects = [];
            $(".list_subjects.selected .list_subject_item").each(function (index, elem) {
                listSubjects.push($(elem).text());
            });
            alert("Các môn học đã chọn: " + listSubjects);
        }
    });
}


$(document).ready(function () {
    hightFooterAndNav();
    handleEventSide();
    handleDragSubjectTag();
    handleSwitchSubjectTag();
    resetInputForm();
    handleSubmitForm();
});

