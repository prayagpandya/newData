import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../../url';
import DynamicTable from '../../Components/dynamicTable';
import withAdminLayout from '../HOF';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-all-courses`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response:', response.data);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const courseHeaders = [
    'Course name',
    'Start Date',
    'Duration',
    'Teacher',
    'Edit',
    'Delete',
  ];

  const courseActions = [
    {
      label: 'Edit',
      colorScheme: 'blue',
      onClick: course => {
        console.log('Edit', course);
      },
    },
    {
      label: 'Delete',
      colorScheme: 'red',
      onClick: course => {
        console.log('Delete', course);
      },
    },
  ];

  const coursesWithLinks = Array.isArray(courses)
    ? courses.map(course => ({
        courseName: (
          <Link to={`/admin/manage-courses/${course._id}`}>{course.title}</Link>
        ),
        startDate: course.startDate,
        duration: `${course.duration} hours`,
        teacher: course.creator,
        // Add other necessary fields as needed
        // Any unnecessary fields like briefDescription, objectives, and overviews are omitted
      }))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <DynamicTable
      caption="Courses List"
      headers={courseHeaders}
      data={coursesWithLinks}
      actions={courseActions}
    />
  );
};

export default withAdminLayout(ManageCourses, 'Manage Courses');
