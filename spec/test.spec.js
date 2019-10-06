const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`

<body>
	<table>
		<tr>
			<td class="box" id="0"></td>
			<td class="box" id="1"></td>
			<td class="box" id="2"></td>
		</tr>
		<tr>
			<td class="box" id="3"></td>
			<td class="box" id="4"></td>
			<td class="box" id="5"></td>
		</tr>
		<tr>
			<td class="box" id="6"></td>
			<td class="box" id="7"></td>
			<td class="box" id="8"></td>
		</tr>
	</table>
	<div class="result">
		<div class="text"></div>
	</div>
	<button id="replay">Replay</button>
</body>
</html>`);
global. document=dom.window.document;

const all=require("../src/js/main");

describe("A suite is just a function", function() {
    var a;
    it("and so is a spec", function() {
      a = true;
      expect(a).toBe(true);
    });
  });
