<h1>Task Matrix</h1>
<h2>Summary</h2>
<p>The Eisenhower Matrix is like a map for managing your tasks. It helps you decide what needs to be done first, what can wait, what can be given to someone else, and what can be left aside. Let's break it down into four boxes: things to do now, things to do later, things to pass on to others, and things to forget about. We'll show you how to use this tool and give you some tips for sorting out your tasks.</p>

<p>Understanding the difference between urgent and important is key here. Urgent means it needs to be done right away. If you ignore urgent tasks, there can be bad consequences, like missing a deadline or causing a bigger problem. These tasks are like fires you need to put out quickly to avoid getting burned out.</p>

<p>For example, finishing a project with a deadline, handling an urgent request from a client, or fixing something broken in your home are all urgent tasks. Now, important tasks might not be urgent, but they're still crucial for reaching your long-term goals. You need to plan for these tasks carefully so you can use your time and energy wisely. This could include planning a big project, meeting new people to grow your business, or just doing regular chores to keep things running smoothly.</p>

<p><img src="assets/EisenhowerMatrix.png"></p>
<h2>View requirements</h2>
<ul dir="auto">
<li>The format expects the following fields:</li>
</ul>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Values</th>
</tr>
</thead>
<tbody>
<tr>
<td>Importance</td>
<td>Choice</td>
<td>High, 
Low</td>
</tr>
<tr>
<td>Urgency</td>
<td>Choice</td>
<td>High, 
Low</td>
</tr>
<tr>
<td>EMatrix</td>
<td>Calculated field, single line of text</td>
<td>=IF(AND(Importance<>"",Urgency<>""),IF(Importance="High",2,1)&"."&IF(Urgency="High",2,1),"")</td>
</tr>

</tbody>
</table>
