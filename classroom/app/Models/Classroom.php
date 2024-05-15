<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Classroom
 * 
 * @property int $id
 * @property string $code
 * @property int $teacher_id
 * @property string $name
 * @property string $subject
 * @property string|null $section
 * @property string|null $room_no
 * @property string|null $deleted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Classroom extends Model
{
	use SoftDeletes;
	protected $table = 'classrooms';

	protected $casts = [
		'teacher_id' => 'int'
	];

	protected $fillable = [
		'code',
		'teacher_id',
		'name',
		'subject',
		'section',
		'room_no'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'teacher_id');
	}
}
