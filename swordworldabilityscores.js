/**
 * Lets you quickly roll a set of ability scores for a Sword World 2.5 character.
Kinda hacky, the table is badly written and formatted, and it doesn't work with Dice so Nice, but it gives me three sets of ability scores with less typing so all's good.
 */
let dialogue = new Dialog({
  title: `Sword World 2.5 Ability Rolls`,
  content: `<p style="font-size: small;">Input number of dice, along with any modifiers they have, and click roll.<br/>Defaults to 1d6 if there's no number entered.</p><table style="table-layout: fixed; text-align: center;">
	<tr style="font-weight: bold;">
		<td/>
		<td>DEX</td>
		<td>AGI</td>
		<td>STR</td>
		<td>VIT</td>
		<td>INT</td>
		<td>SPI</td>
	</tr>
	<tr>
    <td> Dice: </td>
		<td><input style="width: 50px;" type="number" id="dex"/></td>
		<td><input style="width: 50px;" type="number" id="agi"/></td>
		<td><input style="width: 50px;" type="number" id="str"/></td>
		<td><input style="width: 50px;" type="number" id="vit"/></td>
		<td><input style="width: 50px;" type="number" id="int"/></td>
		<td><input style="width: 50px;" type="number" id="spi"/></td>
	</tr>
	<tr>
    <td> Mod: </td>
		<td><input style="width: 50px;" type="number" id="dexm"/></td>
		<td><input style="width: 50px;" type="number" id="agim"/></td>
		<td><input style="width: 50px;" type="number" id="strm"/></td>
		<td><input style="width: 50px;" type="number" id="vitm"/></td>
		<td><input style="width: 50px;" type="number" id="intm"/></td>
		<td><input style="width: 50px;" type="number" id="spim"/></td>
	</tr>
	
</table>`,
  buttons: {
    one: {
      icon: '',
      label: 'Submit',
      callback: async (html) => {
        let rollDice = ['#dex','#agi','#str','#vit','#int','#spi']
        let rollMods = ['#dexm','#agim','#strm','#vitm','#intm','#spim']
        let diceRolls = []

        // First we set up the dice roll expression using the Dice and Mods above.
        // Defaulting to 1d6 if no number is put in the boxes.
        for (let i =0; i< 6; i++){
            let dice = html.find(rollDice[i]).val();
            let mod = html.find(rollMods[i]).val();
            if (dice == '') {dice = 1};
            if (mod == '') {mod = 0}
            diceRolls[i] = "" + dice + "d6";
            if (mod != 0) { diceRolls[i] += "+" + html.find(rollMods[i]).val()};
        }
        // console.log(diceRolls)

        // Then, we make an array to turn into a table by using the dice expressions we just made.
        let diceTable = [["Dex","Agi","Str","Vit","Int","Spi"],[],[],[],[]]
        for (let i = 2; i<5;i++){
            for (let j = 0; j < diceRolls.length; j++){
                let roll = await new Roll(diceRolls[j]).evaluate()
                roll.evaluate
                diceTable[i][j] = roll.total;
            }
        }
        diceTable[1] = diceRolls;
        // console.log(diceTable)

        // And now we make the table for displaying the info
        const center = `text-align:center;`;
  
        let tr = '';
        for(let i = 0; i < 6; i++) {
            tr += `<tr style="width: 40px; text-align:center">`
            for (j =0; j < 5; j++){
                let result = diceTable [j][i]
                tr += `<td>${result}</td>`
            }
            tr += `</tr>`
        }
        let content = `
          <table style="table-layout: fixed;">
            <tr>
              <td colspan=5><h2 style="margin-bottom:0; ${center}">Ability Score Rolls</h2>
            </tr>
            <tr style="${center} border-bottom:1px solid #000">
              ${tr}
            </tr>
        </table>`;
        
        ChatMessage.create({content});
      }
    }
  }
})

dialogue.render(true)
