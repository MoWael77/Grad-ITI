  function handleScheduleClick() {
            alert('Schedule appointment functionality would be implemented here');
        }

        function handleLearnMoreClick() {
            alert('Learn more page would be shown here');
        }

        // Add smooth hover animations
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });


        