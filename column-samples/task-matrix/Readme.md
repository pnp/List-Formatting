<h1>Task Matrix</h1>
<h2>Summary</h2>
<p>The Eisenhower Matrix is a task management tool that helps you organize and prioritize tasks by urgency and importance. Using the tool, you’ll divide your tasks into four boxes based on the tasks you’ll do first, the tasks you’ll schedule for later, the tasks you’ll delegate, and the tasks you’ll delete. In this piece, we’ll explain how to set up an Eisenhower Matrix and provide tips for task prioritization.</p>
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
