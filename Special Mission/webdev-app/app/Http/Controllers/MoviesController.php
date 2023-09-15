<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movies;

class MoviesController extends Controller
{
    public function index(){
        $movies = Movies::all();
        return response()->json($movies);
    }
    
    public function store(Request $request)
    {
        $movies = new Movies([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'genre' => $request->input('genre'),
            'sutradara' => $request->input('sutradara'),
        ]);
        $movies->save();
        return response()->json('Movie created!');
    }
    public function show($id)
    {
        $contact = Movies::find($id);
        return response()->json($contact);
    }
    public function update(Request $request, $id)
    {
       $movies = Movies::find($id);
       $movies->update($request->all());
       return response()->json('Movie updated');
    }
    public function destroy($id)
    {
        $movies = Movies::find($id);
        $movies->delete();
        return response()->json('deleted!');
    }
    //
}
