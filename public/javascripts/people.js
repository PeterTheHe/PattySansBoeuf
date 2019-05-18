//people is GLOBAL Map variable declared in main.js

function addPerson(name){
    //Escape spaces and dodgy shit
    name = encodeURIComponent(name);
    //Ensure we dont get key clash
    if (!people.has(name)){
        //Do the actual adding
        people.set(name, {})
    }
    else
    {
        //TODO: ALERT USER THIS ALREADY EXISTS
        console.warn("person already exists");
    }
}

function removePerson(name){
    name = encodeURIComponent(name);
    people.delete(name);
}

function refreshPeopleTable(){
    $('#pTable').html( `
        <tr> 
            ${Array.from(people).sort().map(p => 
                `<tr id='person-${p[0]}'><td> ${decodeURIComponent(p[0])} </td>
                <td class='table-options'> <a id='remove-${p[0]}' class='rmp-button'> (x) </a> </td></tr>`
            )};
        </tr>
    `);
    $('.rmp-button').click(e => {
        const name = e.target.id.substring(7);
        //Remove the person
        removePerson(name);
        refreshPeopleTable();
        //Remove all relations involving said person
        Array.from(relations).filter(r => r[1].x == name || r[1].y == name).forEach(r => removeRelation(r[0]));
        refreshRelationTable();
    });
}