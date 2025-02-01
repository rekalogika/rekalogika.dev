---
title: Partitioning
---

## How Partitioning Works

The following table shows how the records are partitioned using the hypothetical
`IntegerPartition` with 1-2-3-4-5-6 bits of partitioning width. The leftmost
column indicates the level. Other cells are the partitions of that level.
Numbers in the cells indicate the partitioning key range that are rolled-up in
the partition.

<table class="partitioning">

<tr>
<th>L6</th>
<td colspan="32">0-63</td>
</tr>

<tr>
<th>L5</th>
<td colspan="16">0-31</td>
<td colspan="16">32-63</td>
</tr>

<tr>
<th>L4</th>
<td colspan="8">0-15</td>
<td colspan="8">16-31</td>
<td colspan="8">32-47</td>
<td colspan="8">48-63</td>
</tr>

<tr>
<th>L3</th>
<td colspan="4">0-7</td>
<td colspan="4">8-15</td>
<td colspan="4">16-23</td>
<td colspan="4">24-31</td>
<td colspan="4">32-39</td>
<td colspan="4">40-47</td>
<td colspan="4">48-55</td>
<td colspan="4">56-63</td>
</tr>

<tr>
<th>L2</th>
<td colspan="2">0-3</td>
<td colspan="2">4-7</td>
<td colspan="2">8-11</td>
<td colspan="2">12-15</td>
<td colspan="2">16-19</td>
<td colspan="2">20-23</td>
<td colspan="2">24-27</td>
<td colspan="2">28-31</td>
<td colspan="2">32-35</td>
<td colspan="2">36-39</td>
<td colspan="2">40-43</td>
<td colspan="2">44-47</td>
<td colspan="2">48-51</td>
<td colspan="2">52-55</td>
<td colspan="2">56-59</td>
<td colspan="2">60-63</td>
</tr>

<tr>
<th>L1</th>
<td>0-1</td>
<td>2-3</td>
<td>4-5</td>
<td>6-7</td>
<td>8-9</td>
<td>10-11</td>
<td>12-13</td>
<td>14-15</td>
<td>16-17</td>
<td>18-19</td>
<td>20-21</td>
<td>22-23</td>
<td>24-25</td>
<td>26-27</td>
<td>28-29</td>
<td>30-31</td>
<td>32-33</td>
<td>34-35</td>
<td>36-37</td>
<td>38-39</td>
<td>40-41</td>
<td>42-43</td>
<td>44-45</td>
<td>46-47</td>
<td>48-49</td>
<td>50-51</td>
<td>52-53</td>
<td>54-55</td>
<td>56-57</td>
<td>58-59</td>
<td>60-61</td>
<td>62-63</td>
</tr>

</table>

If we currently have 21 records already rolled-up, these are the partition that
we will have. If we were to perform a query, the framework will combine the
highlighted partitions to get the result:

<table class="partitioning">

<tr>
<th>L6</th>
</tr>

<tr>
<th>L5</th>
</tr>

<tr>
<th>L4</th>
<td colspan="8" class="highlight">0-15</td>
</tr>

<tr>
<th>L3</th>
<td colspan="4">0-7</td>
<td colspan="4">8-15</td>
</tr>

<tr>
<th>L2</th>
<td colspan="2">0-3</td>
<td colspan="2">4-7</td>
<td colspan="2">8-11</td>
<td colspan="2">12-15</td>
<td colspan="2" class="highlight">16-19</td>
</tr>

<tr>
<th>L1</th>
<td>0-1</td>
<td>2-3</td>
<td>4-5</td>
<td>6-7</td>
<td>8-9</td>
<td>10-11</td>
<td>12-13</td>
<td>14-15</td>
<td>16-17</td>
<td>18-19</td>
<td class="highlight">20-21</td>
</tr>

</table>