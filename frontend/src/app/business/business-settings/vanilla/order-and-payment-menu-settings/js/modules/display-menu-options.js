/**
 * Initializes and handles the toggle functionality for menu settings.
 */
export default function () {
    /**
     * Sets up the initial state and event listeners once the DOM content is fully loaded.
     */
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menu-toggle');
        const orderToggleDiv = document.querySelector('.menu-settings__toggle:nth-child(2)');
        const paymentToggleDiv = document.querySelector('.menu-settings__toggle:nth-child(3)');
        const addItemButtonSection = document.querySelector('.menu-setting__floating-button-section');
        const floatingButtonSection = document.querySelector('.menu-setting__floating-button');
        loadToggleStates(); // Load the toggle based on saved states

        /**
         * Simulates saving the current states of toggle buttons.
         * Placeholder for backend API call.
         */
        function saveToggleStates() {
            // Placeholder for saving the current state of toggles to the backend
            console.log('Saving toggle states...');
            // Make API call to the backend
        }
        
         /**
         * Loads and applies the saved toggle states from the backend.
         */
        function loadToggleStates() {
            // Placeholder for loading saved toggle states from the backend
            console.log('Loading toggle states...');
            // Simulate fetching data from the backend
            // Make an API call to your backend to fetch saved states
            // Hardcoded states for demonstration:
            const fetchedStates = {
                menuEnabled: false,
                orderEnabled: true,
                paymentEnabled: true,
            };
        
            // Apply these states to your toggles
            menuToggle.checked = fetchedStates.menuEnabled;
            orderToggleDiv.querySelector('input').checked = fetchedStates.orderEnabled;
            paymentToggleDiv.querySelector('input').checked = fetchedStates.paymentEnabled;
        
            // Update the UI based on these states
            updateToggleLabels();
            updateSliderAppearance();
            updateFloatingButtonVisibility();
        }
        
        
        // Initialize the toggles based on the menu setting
        initializeToggles();     

        /**
         * Updates the visibility of the floating add item button based on the menu toggle state.
         */
        function updateFloatingButtonVisibility() {
            if (menuToggle.checked) {
                floatingButtonSection.classList.remove('hidden');
            } else {
                floatingButtonSection.classList.add('hidden');
            }
        }

          /**
         * Updates the labels next to toggles to reflect their current state off/on.
         */
         function updateToggleLabels() {
            const menuStatusLabel = document.querySelector('label[for="menu-toggle"] .toggle-status');
            const orderStatusLabel = document.querySelector('label[for="order-toggle"] .toggle-status');
            const paymentStatusLabel = document.querySelector('label[for="payment-toggle"] .toggle-status');
         
            menuStatusLabel.textContent = menuToggle.checked ? 'on' : 'off';
            orderStatusLabel.textContent = orderToggleDiv.querySelector('input').checked ? 'on' : 'off';
            paymentStatusLabel.textContent = paymentToggleDiv.querySelector('input').checked ? 'on' : 'off';
         }

        // Initialize labels based on the current state
        updateToggleLabels();
        
        // Set label text based on toggle state
        document.querySelectorAll('.menu-settings__toggle input').forEach(toggle => {
            toggle.addEventListener('change', updateToggleLabels);
        });

        // Initialize floating button visibility based on the current state of the menu toggle
        updateFloatingButtonVisibility();

        // Add event listener to menu toggle to update floating button visibility on change
        menuToggle.addEventListener('change', updateFloatingButtonVisibility);

        // Update appearance on changes
        document.querySelectorAll('.menu-settings__toggle input').forEach(toggle => {
            toggle.addEventListener('change', function() {
                updateSliderAppearance();
                // Additional logic based on specific toggle
                if (toggle.id === 'menu-toggle') {
                    if (toggle.checked) {
                        orderToggleDiv.classList.remove('hidden');
                        paymentToggleDiv.classList.remove('hidden');
                        addItemButtonSection.classList.remove('hidden');
                    } else {
                        orderToggleDiv.classList.add('hidden');
                        paymentToggleDiv.classList.add('hidden');
                        addItemButtonSection.classList.add('hidden');
                    }
                }
            });
        });

        // Setup event listeners for toggles
        document.querySelectorAll('.menu-settings__toggle input').forEach(toggle => {
            toggle.addEventListener('change', function() {
                updateSliderAppearance();
                updateToggleLabels();
                saveToggleStates(); // Save the new states after any toggle changes
            });
        });
        
        function initializeToggles() {
            // Initial state update
            updateSliderAppearance();
            if (menuToggle.checked) {
                orderToggleDiv.classList.remove('hidden');
                paymentToggleDiv.classList.remove('hidden');
                addItemButtonSection.classList.remove('hidden');
            } else {
                orderToggleDiv.classList.add('hidden');
                paymentToggleDiv.classList.add('hidden');
                addItemButtonSection.classList.add('hidden');
            }
        }
    });

    /**
   * Updates the appearance of sliders to reflect their state.
   */
    function updateSliderAppearance() {
        const toggles = document.querySelectorAll('.menu-settings__toggle input');
    
        toggles.forEach(toggle => {
            const slider = toggle.nextElementSibling; // Select the slider span related to each toggle
            const sliderCircle = slider.querySelector('.menu-settings__slider:before');

            if (toggle.checked) {
             
            } else {
                slider.classList.add('menu-settings__slider--off');
            }
        });
    }
}


