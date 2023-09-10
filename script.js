
	<script>
        const addItemForm = document.getElementById('addItemForm');
        const itemNameInput = document.getElementById('itemName');
        const platesList = document.getElementById('platesList');
        const items = JSON.parse(localStorage.getItem('items')) || [];

        function addItem(e) {
            e.preventDefault();

            const itemName = itemNameInput.value;
            if (!itemName) return;

            const item = {
                text: itemName,
                done: false
            };
			items.push(item);
            populateList(items, platesList);
            localStorage.setItem('items', JSON.stringify(items));
            itemNameInput.value = '';
        }

        function toggleDone(e) {
            if (!e.target.matches('input')) return;

            const index = e.target.dataset.index;
            items[index].done = !items[index].done;
            localStorage.setItem('items', JSON.stringify(items));
            populateList(items, platesList);
        }
	function populateList(plates = [], platesList) {
            platesList.innerHTML = plates.map((plate, i) => {
                return `
                <li>
                    <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
                    <label for="item${i}">${plate.text}</label>
                </li>
                `;
            }).join('');
        }

        addItemForm.addEventListener('submit', addItem);
        platesList.addEventListener('click', toggleDone);
        populateList(items, platesList);
    </script>

