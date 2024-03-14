<h1>Task Matrix</h1>
<h2>Summary</h2>
<p>The Eisenhower Matrix is a task management tool that helps you organize and prioritize tasks by urgency and importance. Using the tool, you’ll divide your tasks into four boxes based on the tasks you’ll do first, the tasks you’ll schedule for later, the tasks you’ll delegate, and the tasks you’ll delete. In this piece, we’ll explain how to set up an Eisenhower Matrix and provide tips for task prioritization.</p>
<p>
Urgent and important may seem like similar words, but when analyzing them in terms of the Eisenhower principle, the difference between the two is crucial. Differentiating between urgent and important within the Eisenhower Matrix can help you identify which tasks you should jump on and which tasks might be better handled by other team members. </p>

<p>Urgent tasks require your immediate attention. When something is urgent, it must be done now, and there are clear consequences if you don’t complete these tasks within a certain timeline. These are tasks you can’t avoid, and the longer you delay these tasks, the more stress you’ll likely experience, which can lead to burnout.</p>

<p>Examples of urgent tasks may include:</p>

<ul dir="auto">
<li>Finishing a project with a last-minute due date</li>

<li>Handling an urgent client request</li>

Fixing a busted pipe in your apartment</li>
</ul>
<p>Important tasks may not require immediate attention, but these tasks help you achieve your long-term goals. Just because these tasks are less urgent doesn’t mean they don’t matter. You’ll need to thoughtfully plan for these tasks so you can use your resources efficiently.</p>
<p>Examples of important tasks may include:</p>

<ul dir="auto">
<li>Planning a long-term project</li>

<li>Professional networking to build a client base</li>

<li>Regular chores and maintenance projects</li>
</ul>
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
