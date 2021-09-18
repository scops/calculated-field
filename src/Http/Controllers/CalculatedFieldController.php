<?php
namespace Scops\CalculatedField\Http\Controllers;

use Attribute;
use Illuminate\Routing\Controller;
use Laravel\Nova\Http\Requests\NovaRequest;


class CalculatedFieldController extends Controller
{
    public function calculate($resource, $field, NovaRequest $request)
    {

        // Compatibility with https://github.com/whitecube/nova-flexible-content
        // Fields from flexible content come with a hash__ in front

        /**
         *
         *   ^ asserts position at start of a line
         *   . matches any character (except for line terminators)
         *   __ matches the characters __ literally (case sensitive)
         *   1st Capturing Group (\w+)
         *       \w
         *       matches any word character (equivalent to [a-zA-Z0-9_])
         *       + matches the previous token between one and unlimited times, as many times as possible, giving back as needed (greedy)
         *   $ asserts position at the end of a line
         *
        */
        /*$originalField = $field;

        preg_match('/^(.*?)__(\w+)$/', $field, $match);

        if (!empty($match) && array_key_exists(1,$match)) {
            $key = $match[1];
        }
        if (!empty($match) && array_key_exists(2,$match)) {
            $field = $match[2];
        }


        $flexible = $request->newResource()
        ->availableFields($request)->where('component', '=', 'nova-flexible-content')
        ->first();

            dd($flexible->getAttributes());
        */

        $field = $request->newResource()
            ->availableFields($request)
            ->where('attribute', '=', $field)
            ->first();


        if (empty($field)) {


            abort(404, "Unable to find the field required to calculate this value");
        }

        $calculatedValue = call_user_func(
            $field->calculateFunction,
            collect($request->json()->all()),
            $request
        );

        return response()->json([
            'value' => $calculatedValue
        ]);
    }
}
