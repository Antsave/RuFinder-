from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

def login_view(request):
    if request.method == 'POST':
        # This processes the form when the user clicks "Enter"
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('profile')  # Send them to the profile page
    else:
        # This creates a new blank form for a GET request
        form = AuthenticationForm()
    
    # Pass the form into the template
    return render(request, 'login.html', {'form': form})

@login_required  # This decorator protects the page
def profile_view(request):
    # This view stays simple
    return render(request, 'profile.html')